import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm'

enum DiscountType {
  PERCENT = 'percent',
  FIXED = 'fixed',
}

@Entity('coupons')
export class Coupon {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ unique: true })
  code: string

  @Column({
    name: 'discount_type',
    type: 'enum',
    enum: DiscountType,
  })
  discountType: DiscountType

  @Column({ name: 'discount_value', type: 'decimal', precision: 15, scale: 2 })
  discountValue: number

  @Column({ name: 'min_spend', type: 'decimal', precision: 15, scale: 2, nullable: true })
  minSpend: number

  @Column({ name: 'max_discount', type: 'decimal', precision: 15, scale: 2, nullable: true })
  maxDiscount: number

  @Column({ name: 'start_date' })
  startDate: Date

  @Column({ name: 'end_date' })
  endDate: Date

  @Column({ name: 'usage_limit', nullable: true })
  usageLimit: number

  @Column({ name: 'usage_count', default: 0 })
  usageCount: number

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
