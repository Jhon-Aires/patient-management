import 'server-only';

export async function getPatients(
  search: string,
  offset: number
): Promise<{
  patients: any[];
  newOffset: number | null;
  totalProducts: number;
}> {
  const response = await fetch(
    'https://63bedcf7f5cfc0949b634fc8.mockapi.io/users'
  );

  // if (offset === null) {
  //   return { products: [], newOffset: null, totalProducts: 0 };
  // }

  const moreProducts: any = [];
  let newOffset = moreProducts.length >= 5 ? offset + 5 : null;

  return {
    patients: await response.json(),
    newOffset,
    totalProducts: 0
  };
}

export async function deleteProductById(id: number) {
  // await db.delete(products).where(eq(products.id, id));
}
