import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemon } from "../../features/card/cardSlice";
import { useParams } from "react-router-dom";
import Loading from "../../components/App/Loading";

function SinglePokemon() {
  const { id } = useParams();
  const loading = useSelector((state) => state.card.loading);
  const Pokemon = useSelector((state) => state.card.Pokemon);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, []);
  console.log(loading, Pokemon);
  const { name, images, info, about } = Pokemon;
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {name}
            </h2>
            <p className="mt-4 text-gray-500">
              {about.toString().slice(0, 300) + "..."}
            </p>
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {Object.entries(info).map(([key, value]) => {
                return (
                  <div key={key} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="mt-2 text-sm text-gray-500">{value}</dd>
                  </div>
                );
              })}
            </dl>
          </div>
          <div className="grid grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={images[0]}
              alt={name}
              className="rounded-lg bg-gray-100 object-cover h-96 w-192"
            />
            <img
              src={images[1]}
              alt={name}
              className="rounded-lg bg-gray-100 object-cover h-96 w-192"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePokemon;
