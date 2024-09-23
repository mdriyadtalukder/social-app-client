import img from '../../../../assets/empty.png'
const Child = ({ d }) => {
    return (
        <div
            className="w-full rounded-lg text-gray-900 ">
            <div className="rounded-t-lg h-48 overflow-hidden">
                <img className="object-cover object-top w-full " src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32 w-full" src={d?.image || img} alt='Woman looking front' />
            </div>
            <div className="text-center mt-2">
                <h2 className="font-bold text-2xl">{d?.name}</h2>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-center gap-12">
                <li className="flex flex-col items-center justify-around">

                    <div className="font-bold">{d?.post}</div>
                    <div>Posts</div>
                </li>
                <li className="flex flex-col items-center justify-between">

                    <div className="font-bold">{d?.followers.length}</div>
                    <div>Followers</div>
                </li>
                <li className="flex flex-col items-center justify-around">

                    <div className="font-bold">{d?.following.length}</div>
                    <div>Following</div>
                </li>
            </ul>

        </div>
    );
};

export default Child;