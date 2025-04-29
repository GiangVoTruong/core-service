import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity('product_images')
export class ProductImage {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'image_url' })
  imageUrl: string

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
