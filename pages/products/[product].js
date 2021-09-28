export default function product({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { productData } = await import('../../util/productData');
  const input = context.query.product;

  const foundProduct = productData.find((el) => el.keyword === input);
  console.log(context.query);
  return {
    props: {
      product: foundProduct,
    }, // will be passed to the page component as props
  };
}
