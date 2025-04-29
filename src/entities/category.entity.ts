import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm'

import { Product } from './product.entity'
@Entity('categories')
export class Category {
  @PrimaryColumn({ length: 50 })
  id: string

  @Column({ name: 'parent_id', nullable: true })
  parentId: string

  @ManyToOne(() => Category, category => category.children, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parent_id' })
  parent: Category

  @OneToMany(() => Category, category => category.parent)
  children: Category[]

  @Column()
  name: string

  @Column({ unique: true })
  slug: string

  @Column({ name: 'image_url', nullable: true })
  imageUrl: string

  @Column({ name: 'display_order', default: 0 })
  displayOrder: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => Product, product => product.category)
  products: Product[]
}
