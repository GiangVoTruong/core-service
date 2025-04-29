import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Order } from './order.entity'

enum PaymentProvider {
  VNPAY = 'vnpay',
  MOMO = 'momo',
  PAYPAL = 'paypal',
  STRIPE = 'stripe',
}

enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

@Entity('payments')
export class Payment {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'order_id' })
  orderId: string

  @ManyToOne(() => Order, order => order.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number

  @Column({
    type: 'enum',
    enum: PaymentProvider,
  })
  provider: PaymentProvider

  @Column({
    type: 'enum',
    enum: PaymentStatus,
  })
  status: PaymentStatus

  @Column({ name: 'transaction_id', nullable: true })
  transactionId: string

  @Column({ name: 'transaction_data', type: 'jsonb', nullable: true })
  transactionData: any

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
