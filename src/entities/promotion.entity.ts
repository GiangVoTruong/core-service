import { Entity, Column, PrimaryColumn, OneToMany, CreateDateColumn } from 'typeorm'
import { PromotionProduct } from './promotion-product.entity'

enum DiscountType {
  PERCENT = 'percent',
  FIXED = 'fixed',
}

@Entity('promotions')
export class Promotion {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column()
  name: string

  @Column({
    name: 'discount_type',
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType

  @Column({ name: 'discount_value', type: 'decimal', precision: 15, scale: 2 })
  discountValue: number

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => PromotionProduct, promotionProduct => promotionProduct.promotion)
  products: PromotionProduct[]
}
