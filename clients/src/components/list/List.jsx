import './list.scss'
import Card from"../card/Card"

function List({post}){
  console.log(post);
  
  return (
    <div className='list'>
      {post.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List