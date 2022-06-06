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
    padding: '0',
    minWidth:'100%'
}


function ItemListContainer({categoryProp, currentPage, setCurrentPage}){
    const [productos,setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [postsPerPage] = useState(6);
    const { categoryId } = useParams();
    
    useEffect(() => {
        setLoading(true);

        const productosRef = collection(db, 'productos')
        const q = categoryId ? query(productosRef, where('category', '==', categoryId)) : query(productosRef, where('category', '==', 'buzos'))

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
                        {categoryProp}
                        </h1>
                            <div className='pageContainer'>
                                 <ItemList items={currentPosts}/>
                                 <Pagination
                                    postsPerPage={postsPerPage}
                                    totalPosts={productos.length}
                                    paginate={paginate}
                                    category={categoryProp}
                                    
                                 />
                            </div>
                        </div>
                }

            </>
            )
}

export default ItemListContainer;
