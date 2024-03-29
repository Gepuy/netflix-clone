import {useEffect, useState} from "react";
import axios from "axios";
import Movie from "./Movie";
import {MdChevronRight, MdChevronLeft} from "react-icons/md";

const Row = ({ title, fetchURL, rowID }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results);
        });
    }, [fetchURL]);

    const slideLeft = () => {
        let slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft
                    size={40}
                    className={'bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'}
                    onClick={slideLeft}
                />
                <div
                    id={'slider' + rowID}
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >

                    {movies.map((item, id) => (
                        <Movie key={id} item={item} />
                    ))}
                </div>
                <MdChevronRight
                    size={40}
                    className={'bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 group-hover:block'}
                    onClick={slideRight}
                />
            </div>
        </>
    );
};

export default Row;