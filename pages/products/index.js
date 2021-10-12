import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AmountInput from '../../components/AmountInput';
import BigButton from '../../components/BigButton';
import SearchBar from '../../components/SearchBar';
import { getProducts } from '../../util/database';

const productsContainerStyle = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  grid-gap: 60px 80px;
`;

const singleProductContainerStyle = css`
  display: grid;
  align-items: center;
  row-gap: 30px;
  width: 360px;
  height: 450px;
  padding: 20px 40px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 10px;
  font-size: 22px;

  color: #212529;
  transform: scale(1);
  transition: transform 1s;

  &:hover {
    transform: scale(1.03);
    transition: transform 1s;
  }
`;

const productHyperlinkStyle = css`
  text-decoration: none;
  cursor: pointer;
`;

const productHeadingStyle = css`
  min-height: 60px;
  font-size: 30px;
`;

const productPriceStyle = css`
  font-weight: bolder;
  font-size: 28px;
`;
export default function Products(props) {
  const [searchInput, setSearchInput] = useState('');
  const [filterMethod, setFilterMethod] = useState(() => {
    return (el) => el;
  });
  const handleSearchInputChange = ({ currentTarget }) => {
    const input = currentTarget.value;
    setSearchInput(input);
  };

  const normalizeContent = (input) => {
    let splitString = input.split(' ');
    splitString = splitString.map((el) => {
      return (
        el.slice(0, 1).toUpperCase() + el.slice(1, el.length).toLowerCase()
      );
    });

    return splitString.join(' ');
  };

  useEffect(() => {
    const normalizedContent = normalizeContent(searchInput);
    if (normalizedContent.length !== 0) {
      setFilterMethod(() => {
        return (el) => {
          const newEl = el.name.replace(/\(|\)/g, '');

          if (newEl.includes(normalizedContent)) {
            return el;
          }
          return;
        };
      });
    } else {
      setFilterMethod(() => {
        return (el) => el;
      });
    }
  }, [searchInput]);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <SearchBar
        searchInput={searchInput}
        handleSearchInputChange={handleSearchInputChange}
      />
      {props.productData.filter(filterMethod).length < 1 && (
        <p>No items found.</p>
      )}
      <div css={productsContainerStyle}>
        {props.productData.filter(filterMethod).map((product, index) => {
          return (
            <div key={`product-${product.id}`}>
              <div css={singleProductContainerStyle}>
                <Link href={`products/${product.keyword}`}>
                  <a css={productHyperlinkStyle}>
                    <h2 css={productHeadingStyle}>{product.name}</h2>
                  </a>
                </Link>
                <Image
                  src={`/images/img${product.id}.svg`}
                  alt="product"
                  width="80"
                  height="80"
                />

                <p css={productPriceStyle}>{product.price.toFixed(2)}€</p>
                <AmountInput
                  value={props.amount[index]}
                  handleIncrementClick={() => props.handleIncrementClick(index)}
                  handleDecrementClick={() => props.handleDecrementClick(index)}
                  dataCy={`amount-increase-${index}`}
                />
                <BigButton
                  name="Add to Cart"
                  onClick={() =>
                    props.handleAddClick(product.id, props.amount[index])
                  }
                  index={index}
                  data-cy={`add-button-${index}`}
                >
                  Add To Cart
                </BigButton>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const products = await getProducts();
  return {
    props: { productData: products }, // will be passed to the page component as props
  };
}
