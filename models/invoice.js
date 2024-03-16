const  { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } =  "typeorm";


@Entity({ name: "Invoice" })
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  invoice_id

  @Column()
  number
  
  @Column()
  date

  @Column()
  customerInformation

  @Column()
   line

}
export default Invoice;