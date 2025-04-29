import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm'
import { Product } from './product.entity'

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'product_id' })
  productId: string

  @ManyToOne(() => Product, product => product.attributes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product

  @Column({ name: 'attribute_name' })
  attributeName: string

  @Column({ name: 'attribute_value' })
  attributeValue: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date
}
