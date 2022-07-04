import Package from "../components/package"

const ListPageMobile = ({data}) =>{
    return <article>
            <div className="container">
                <div className="row" style={{marginBottom:'30px'}}>
                    <h2>Kiomoi packages</h2>
                </div>
                <div className="row">
                    {
                        data.map((item)=>{
                            return <Package key={item.id} item={item} />
                        })
                    }
                </div>
            </div>
        </article>
}
export default ListPageMobile