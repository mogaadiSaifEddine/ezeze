import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { CouponsService } from 'src/app/services/coupons.service';
import { ColorState, Coupon } from 'src/app/model/Coupon';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  displayedColumns: string[] = ['Type', 'Refrence', 'qr-code', 'Status', 'Action'];
  dataSource: Coupon[];
  // dataSource: any;
  colorState = ColorState;
  constructor(private dialog: MatDialog, private couponsService: CouponsService) {}

  ngOnInit(): void {
    this.getCouponsList();
    // this.dataSource = [
    //   {
    //     type: 'test',
    //     ref: 'sjdfsfslkdjf',
    //     state: 'used'
    //   }
    // ];
  }

  getCouponsList() {
    this.couponsService.getCouponsList().subscribe((res: Coupon[]) => {
      this.dataSource = res;
    });
  }
  openAddCouponModal() {
    const dialogRef = this.dialog.open(AddCouponComponent, {
      panelClass: 'my-custom-dialog-class',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.getCouponsList();
    });
  }

  downloadQRCode(id) {
    const fileNameToDownload = 'image_qrcode';
    const base64Img = document.getElementById(id).children[0].children[0] as HTMLCanvasElement;

    const link = document.createElement('a');
    link.href = base64Img.toDataURL('image/png');
    link.download = `qrcode/${id}.png`;
    link.click();
  }
}
