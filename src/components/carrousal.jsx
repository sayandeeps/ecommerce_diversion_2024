import React, { useEffect, useState } from 'react';
import { Client, Databases } from 'appwrite';
import { useNavigate } from 'react-router-dom';


const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65be4f2ad38b98334bd8'); // Your project ID

const Carrousal = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await databases.listDocuments('65be4f8e873c41602c2c', '65be4fce8807a0325601');
                setProducts(response.documents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    const navigate = useNavigate();

    const handleProductClick = (productId,event) => {
      event.preventDefault();
      const productDetailsUrl = `/ds/${productId}`;
      navigate(productDetailsUrl);
    };

    return (
      <>
      <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                  {products.map((product) => (
                      <div  key={product.$id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
<a href="/" onClick={(e) => handleProductClick(product.$id, e)} className="block relative h-48 rounded overflow-hidden">
                              <img
                                  alt={product.name}
                                  className="object-cover object-center w-full h-full block"
                                  src={product.thumbnail}
                              />
                          </a>
                          <div className="mt-4">
                              <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY {product.$id}</h3>
                              <h2 className="text-gray-900 title-font text-lg font-medium">{product.name}</h2>
                              <p className="mt-1">{product.details}</p>
                              {/* You can add more details as needed */}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  </>
    );
};

export default Carrousal;
