import { Component, Input } from '@angular/core';
import { Guest, Order } from 'src/app/models/order.model';
import { faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { StayFilter } from 'src/app/models/stay.model';
@Component({
  selector: 'header-filter-guest-modal',
  templateUrl: './header-filter-guest-modal.component.html',
  styleUrls: ['./header-filter-guest-modal.component.scss']
})
export class HeaderFilterGuestModalComponent {
  @Input() order !: Order
  @Input() stayFilter!: StayFilter
  faCirclePlus = faCirclePlus
  faCircleMinus = faCircleMinus

  get Guests() {
    const guests = []
    let key: keyof Guest
    for (key in this.order.guests) {
      guests.push({ type: key, amount: this.order.guests[key] })
    }
    return guests
  }

  GuestTypeSubTitle(guestType: keyof Guest) {
    if(guestType === 'adults') return '13 év fölött'
    if(guestType === 'children') return '2-12 év között'
    if(guestType === 'infants') return '2 év alatt'
    return 'Hoz magával segítő állatot?'
  }

  checkMinusBtn(guestType: keyof Guest) {
    if (guestType === 'adults') return this.order.guests.adults > 1
    return this.order.guests[guestType] > 0
  }

  checkPlusBtn(guestType: string) {
    if (guestType === 'adults' || guestType === 'children') {
      return this.order.guests.adults + this.order.guests.children < 16
    }
    if (guestType === 'infants') return this.order.guests.infants < 5
    if (guestType === 'pets') return this.order.guests.pets < 3
    return false
  }

  onAddGuests(guestType: keyof Guest, diff: number) {
    this.order.guests[guestType] += diff
    if(guestType === 'pets') {
      if(this.order.guests.pets > 0)  this.stayFilter.isPetAllowed = 'true'
      else this.stayFilter.isPetAllowed = 'false'
    }
  }
}
