import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { jsPDF } from 'jspdf';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  dataService = inject(DataService);
  generatePDF(){
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(18);
    doc.text(
      `Monthly Sales Report for ${this.dataService.clientData.name}`,
      60,
      20
    );
    doc.setFontSize(12);
    doc.text(`Reporting Period ${this.dataService.clientData.name}`, 60, 30);

    // Add transactions
    let yPos = 50;
    this.dataService.clientData.transactions.forEach((transaction) => {
      doc.text(
        `${transaction.date} - ${
          transaction.description
        } $${transaction.amount.toFixed(2)}`,
        10,
        yPos
      );
      yPos += 10;
    });

    // Add total sales
    doc.setFontSize(14);
    doc.text(`Total Sales: $${this.dataService.totalSales.toFixed(2)}`, 10, yPos+20);

    doc.save('monthly-report.pdf');
  }
}
