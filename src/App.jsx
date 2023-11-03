
import SinglePost from './components/SinglePost';
import { useEffect, useState } from 'react';



const App = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const numberOfPages = Math.ceil(count / itemsPerPage);


  const pages = [...Array(numberOfPages).keys()];


  useEffect(() => {
    fetch('http://localhost:5000/postsCounts')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:5000/posts?page=${currentPage}&size=${itemsPerPage}`)
        .then(res => res.json())
        .then(data => setProducts(data))
}, [currentPage, itemsPerPage]);


  const handleItemsPerPage = e => {
    const val = parseInt(e.target.value);
    console.log(val);
    setItemsPerPage(val);
    setCurrentPage(0);
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  }



  return (
    <div className='max-w-5xl mx-auto flex flex-col gap-5 mt-10'>

      {
        products.map((post) => <SinglePost key={post._id} post={post}></SinglePost>)
      }

      {/* pagination */}
      <div className='mx-auto mb-10'>
        <button className='border bg-blue-700 mr-2 w-20' onClick={handlePrevPage}>Prev</button>
        {
          pages.map(page => <button
            key={page}
            className={currentPage === page ? 'bg-blue-700 text-white px-4 rounded mr-2' : 'px-4 rounded bg-slate-800 mr-2'}
            onClick={() => setCurrentPage(page)}
          >{page}</button>)
        }
        <button className='border bg-blue-700 mr-4 w-20' onClick={handleNextPage}>Next</button>
        <select className='border bg-green-700 w-20' value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

    </div>
  );
};

export default App;