import { Injectable } from '@angular/core';
import { IModal } from '../interfaces/imodal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private modals: IModal[] = []

  private visible: boolean = false

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })

  }

  shahil: any

  isModelOpen(id: string): boolean {
    return Boolean(this.modals.find(element => element.id === id)?.visible)
  }


  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id)
    if (modal) {
      modal.visible = !modal.visible
    }
  }

}
