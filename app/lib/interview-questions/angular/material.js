export const materialQuestions = [
    {
        id: 'angular-material-1',
        category: 'Angular Material',
        difficulty: 'Medium',
        question: 'Angular Material Setup and Theming',
        answer: `**Angular Material** provides pre-built UI components.

### Setup:
\`ng add @angular/material\`

### Features:
- Material Design components
- Theming system
- Accessibility built-in

### Components:
Button, Card, Dialog, Table, etc.`,
        codeExample: `// Angular Material
console.log('=== Setup ===');
console.log('ng add @angular/material');

console.log('\\n=== Using Components ===');
console.log('import { MatButtonModule } from "@angular/material/button";');
console.log('');
console.log('@Component({');
console.log('  imports: [MatButtonModule],');
console.log('  template: "<button mat-raised-button>Click</button>"');
console.log('})');

console.log('\\n=== Custom Theme ===');
console.log('@use "@angular/material" as mat;');
console.log('');
console.log('$my-theme: mat.define-theme((');
console.log('  color: (');
console.log('    theme-type: light,');
console.log('    primary: mat.$azure-palette');
console.log('  )');
console.log('));');

console.log('\\n✓ Material: Pre-built UI components');`
    },
    {
        id: 'angular-material-2',
        category: 'Angular Material',
        difficulty: 'Hard',
        question: 'Material Dialog - MatDialog Service',
        answer: `**MatDialog** creates modal dialogs.

### Features:
- Modal dialogs
- Pass data
- Get result

### Use Cases:
- Confirmations
- Forms
- Details`,
        codeExample: `// Material Dialog
console.log('=== Opening Dialog ===');
console.log('class Component {');
console.log('  dialog = inject(MatDialog);');
console.log('  ');
console.log('  openDialog() {');
console.log('    const dialogRef = this.dialog.open(DialogComponent, {');
console.log('      data: { name: "John" }');
console.log('    });');
console.log('    ');
console.log('    dialogRef.afterClosed().subscribe(result => {');
console.log('      console.log("Result:", result);');
console.log('    });');
console.log('  }');
console.log('}');

console.log('\\n=== Dialog Component ===');
console.log('class DialogComponent {');
console.log('  data = inject(MAT_DIALOG_DATA);');
console.log('  dialogRef = inject(MatDialogRef);');
console.log('  ');
console.log('  close() {');
console.log('    this.dialogRef.close("result");');
console.log('  }');
console.log('}');

console.log('\\n✓ MatDialog: Modal dialogs');`
    },
    {
        id: 'angular-material-3',
        category: 'Angular Material',
        difficulty: 'Medium',
        question: 'Material Table - MatTable with Sorting and Pagination',
        answer: `**MatTable** displays data in tables.

### Features:
- Sorting
- Pagination
- Filtering
- Selection

### Best Practice:
Use with MatTableDataSource`,
        codeExample: `// Material Table
console.log('=== Basic Table ===');
console.log('class Component {');
console.log('  dataSource = new MatTableDataSource(users);');
console.log('  displayedColumns = ["name", "email", "actions"];');
console.log('}');

console.log('\\n=== Template ===');
console.log('<table mat-table [dataSource]="dataSource">');
console.log('  <ng-container matColumnDef="name">');
console.log('    <th mat-header-cell *matHeaderCellDef>Name</th>');
console.log('    <td mat-cell *matCellDef="let user">{{ user.name }}</td>');
console.log('  </ng-container>');
console.log('</table>');

console.log('\\n=== With Sorting & Pagination ===');
console.log('@ViewChild(MatSort) sort!: MatSort;');
console.log('@ViewChild(MatPaginator) paginator!: MatPaginator;');
console.log('');
console.log('ngAfterViewInit() {');
console.log('  this.dataSource.sort = this.sort;');
console.log('  this.dataSource.paginator = this.paginator;');
console.log('}');

console.log('\\n✓ MatTable: Feature-rich tables');`
    },
    {
        id: 'angular-material-4',
        category: 'Angular Material',
        difficulty: 'Hard',
        question: 'Material Form Fields - Reactive Forms Integration',
        answer: `**Material form fields** provide styled form inputs.

### Components:
- mat-form-field
- mat-input
- mat-select
- mat-checkbox

### Features:
- Error messages
- Hints
- Prefixes/suffixes`,
        codeExample: `// Material Form Fields
console.log('=== Form Field ===');
console.log('<mat-form-field>');
console.log('  <mat-label>Email</mat-label>');
console.log('  <input matInput [formControl]="email">');
console.log('  <mat-error *ngIf="email.hasError(\'required\')">');
console.log('    Email is required');
console.log('  </mat-error>');
console.log('  <mat-hint>Enter your email</mat-hint>');
console.log('</mat-form-field>');

console.log('\\n=== Select ===');
console.log('<mat-form-field>');
console.log('  <mat-label>Country</mat-label>');
console.log('  <mat-select [formControl]="country">');
console.log('    <mat-option value="us">USA</mat-option>');
console.log('    <mat-option value="uk">UK</mat-option>');
console.log('  </mat-select>');
console.log('</mat-form-field>');

console.log('\\n✓ Material forms: Styled, accessible');`
    }
];
