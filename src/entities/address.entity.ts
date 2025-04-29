import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Users } from './user.entity'

@Entity('addresses')
export class Address {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => Users, user => user.addresses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: Users

  @Column({ name: 'recipient_name' })
  recipientName: string

  @Column()
  phone: string

  @Column({ name: 'full_address', type: 'text' })
  fullAddress: string

  @Column({ name: 'is_default', default: false })
  isDefault: boolean

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
