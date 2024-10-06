import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteProduct } from '../(dashboard)/actions';

export function Patient({ product }: { product: any }) {
  //   avatar
  // :
  // "http://res.cloudinary.com/duaace1ft/image/upload/v1724979774/pukichwcfa0sdmhq5irm.jpg"
  // createdAt
  // :
  // "2023-03-06T05:17:35.091Z"
  // description
  // :
  // "Pariatur repellat voluptas perferendis error. Sint maiores recusandae minus accusamus sapiente delectus eveniet expedita. Impedit deleniti aliquam non.\nExpedita odit nobis ipsa incidunt in praesentium beatae. Necessitatibus animi ex vero repellendus ipsum quidem sequi. Sint architecto officiis vero labore totam perspiciatis perferendis nisi aspernatur.\nIllum reprehenderit suscipit suscipit sequi libero enim veniam. Aperiam accusantium recusandae blanditiis porro. Laudantium qui harum voluptatem sint tempora. Deleniti nesciunt ratione at minima quaerat."
  // id
  // :
  // "11"
  // name
  // :
  // "Real nuevoss"
  // website
  // :
  // "https://squeaky-angstrom.com"

  console.log('product', product);

  return (
    <TableRow>
      <TableCell className="hidden h-12 sm:table-cell">
        <img
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.avatar || '/images/placeholder.jpg'}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        
        {/* <p className="max-h-10 overflow-hidden"> */}
          {product.description}
          {/* </p> */}
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell> */}
      {/* <TableCell className="hidden md:table-cell">{product.stock}</TableCell> */}
      <TableCell className="hidden md:table-cell">
        {new Date(product.createdAt).toLocaleDateString('en-GB')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
