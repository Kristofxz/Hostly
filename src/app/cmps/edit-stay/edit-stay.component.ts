import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { StayService } from 'src/app/services/stay.service';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'edit-stay',
  templateUrl: './edit-stay.component.html',
  styleUrls: ['./edit-stay.component.scss']
})
export class EditStayComponent {
  constructor(private stayService: StayService,
    private uploadImgService: UploadImgService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  @Input() user!: User
  stay = this.stayService.getEmptyStay()
  imgData = new Array(5).fill({ imgUrl: '', height: 500, width: 500 })
  selectSettings = {}
  labels = this.Labels

  async ngOnInit () {
    this.selectSettings = this.Settings
    const stayId = this.route.snapshot.paramMap.get('id')
    if (stayId) this.loadStay(stayId)
  }

  async loadStay (stayId: string) {
    try {
      this.stay = await lastValueFrom(this.stayService.getById(stayId)) as any
      this.loadImg()
    } catch (err) {
      console.log(err)
    }
  }

  loadImg (): void {
    this.imgData = this.imgData.map((_, idx) => {
      return { imgUrl: this.stay.imgUrls?.[idx], height: 500, width: 500 }
    })
  }

  async onAddStay () {
    const user = this.userService.getUser()
    const country = this.stay.loc.country
    const city = this.stay.loc.city
    const address = this.stay.loc.address
    this.stay.loc.address = address
    this.stay.host = { ...this.stay.host, _id: user._id, pictureUrl: user.imgUrl, fullname: user.fullname }
    if (!this.checkValidation()) return
    this.stay.loc.address = '${address}, ${city}, ${country}';
    try {
      await this.stayService.save(this.stay)
      this.snackBar.open('Szállás sikeresen hozzáadva!', 'Vissza', { duration: 3000 })
      this.router.navigate(['/user/stays'])
    } catch (err) {
      console.log(err)
    }
  }

  checkValidation () {
    const stay = this.stay
    if (stay.imgUrls.length < 5) {
      this.snackBar.open('Legalább 5 képet tölts föl!', 'Vissza', { duration: 3000 })
      return false
    }
    if (stay.capacity < 1) {
      this.snackBar.open('Legalább 1 férőhelyet állíts be!', 'Vissza', { duration: 3000 })
      return false
    }
    if (stay.name === '') {
      this.snackBar.open('A szállás neve kötelező!', 'Vissza', { duration: 3000 })
      return false
    }
    if (stay.price < 1) {
      this.snackBar.open('Adj meg érvényes árat!', 'Vissza', { duration: 3000 })
      return false
    }
    if (!/^[a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰ]{3,}$/.test(stay.loc.country)) {
      this.snackBar.open('Adj meg létező országot!', 'Vissza', { duration: 3000 })
      return false
    }
    if (!/^[a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰ]{2,}$/.test(stay.loc.city)) {
      this.snackBar.open('Adj meg létező várost!', 'Vissza', { duration: 3000 })
      return false
    }
    if (!/^[a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰ][a-zA-ZáÁéÉíÍóÓöÖőŐúÚüÜűŰ0-9\s]{2,}$/.test(stay.loc.address)) {
      this.snackBar.open('Adj meg létező címet!', 'Vissza', { duration: 3000 })
      return false
    }
    return true
  }

  async uploadImg (ev: Event, index: number) {
    const { secure_url, height, width } = await this.uploadImgService.uploadImg(ev)
    this.imgData[index] = { imgUrl: secure_url, width, height }
    const imgUrl = this.imgData[index].imgUrl
    this.stay.imgUrls.push(imgUrl)
  }

  get Labels () {
    return [
      'Nagyszerű kilátás', ,
      'Felkapott',
      'Szörf',
      'Kúria',
      'Luxus',
      'Privát szoba', ,
      'Tópart', ,
      'Kis ház', ,
      'Strand',
      'Design',
    ]
  }

  get Settings () {
    return {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Összes kiválaszt',
      unSelectAllText: 'UnSelect All'
    }
  }
}
