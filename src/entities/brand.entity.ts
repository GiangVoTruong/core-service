import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from 'typeorm'
import { Product } from './product.entity'
@Entity('brands')
export class Brand {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => Product, product => product.brand)
  products: Product[]
}
