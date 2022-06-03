import React, { useEffect, useState } from "react";
import ItemList from '../ItemList/ItemList';
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import './ItemListContainer.css'
import Loader from "../Loader/Loader";
import Pagination from '../Pagination/Pagination';


const catalogoContainer = {
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '10px',
    minWidth:'100%'
}


function ItemListContainer(){
    const [productos,setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(6);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, 'productos')
        const q = categoryId ? query(productosRef, where('category', '==', categoryId)) : productosRef

        getDocs(q)
            .then(resp => {
                const items = resp.docs.map((doc) => ({id:doc.id, ...doc.data()}))
                setProductos(items)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [categoryId])
    
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = productos.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
        
    return (
            <>
                {
                    loading
                    ? <div className="loader-container"><Loader/></div>
                    : <div style={catalogoContainer}>
                        <h1 className='mainTitle' style={{ textTransform: 'uppercase'}}>
                        {
                            categoryId === undefined
                            ? 'CATÁLOGO'
                            : [categoryId]
                        }
                        </h1>
                        {
                            categoryId === undefined
                            ? <div className='pageContainer'>
                                <ItemList items={currentPosts}/>
                                <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={productos.length}
                                    paginate={paginate}
                                />
                             </div>
                            : <ItemList items={productos}/>
                        }
                        </div>
                }

            </>
            )
}

export default ItemListContainer;
