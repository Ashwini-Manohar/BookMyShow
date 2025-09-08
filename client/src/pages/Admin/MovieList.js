import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import MovieForm from "./MovieForm";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import { getAllMovies } from "../../api/movie";
import { useDispatch } from "react-redux";
import moment from "moment";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieList() {
const fakeMovies = [
{
key: "1",
poster: "Image1",
description: "Wolverine Vs Deadpool",
duration: 120,
genre: "Action",
language: "English",
releaseDate: "2024-08-01",
name: "Wolverine Vs Deadpool",
},
{
key: "2",
poster: "Image2",
description: "Wolverine Vs Deadpool",
duration: 120,
genre: "Action",
language: "English",
releaseDate: "2024-08-01",
name: "Wolverine Vs Deadpool 2",
},
];
const tableHeadings = [
{
title: "Poster",
dataIndex: "poster",
render: (text, data) => {
return (
<img
width="75"
height="115"
style={{ objectFit: "cover" }}
src={data.poster}
/>
);
},
},
{
title: "Movie Name",
dataIndex: "title",
},
{
title: "Description",
dataIndex: "description",
},
{
title: "Duration",
dataIndex: "duration",
render: (text) => {
return `${text} Min`;
},
},
{
title: "Genre",
dataIndex: "genre",
},
{
title: "Language",
dataIndex: "language",
},
{
title: "Release Date",
dataIndex: "releaseDate",
render: (text, data) => {
return moment(data.releaseDate).format("MM-DD-YYYY");
},
},
{
title: "Action",
render: (text, data) => {
return (
<div>
<Button
onClick={() => {
setIsModalOpen(true);
setSelectedMovie(data);
setFormType("edit");
}}
>
<EditOutlined />
</Button>
<Button
onClick={() => {
setIsDeleteModalOpen(true);
setSelectedMovie(data);
}}
>
<DeleteOutlined />
</Button>
</div>
);
},
},
];

const [isModalOpen, setIsModalOpen] = useState(false);
const [movies, setMovies] = useState(fakeMovies);
const [selectedMovie, setSelectedMovie] = useState(null);
const [formType, setFormType] = useState("add");
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const dispatch = useDispatch();

const getData = async () => {
dispatch(ShowLoading());
const response = await getAllMovies();
const allMovies = response.data;
setMovies(
allMovies.map(function (item) {
return { ...item, key: `movie${item._id}` };
})
);
dispatch(HideLoading());
};
useEffect(() => {
getData();
}, []);
return (
  <>
    {/* Button container */}
    <div className="d-flex justify-content-end mb-3">
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setFormType("add");
        }}
      >
        Add Movie
      </Button>
    </div>

    {/* Table */}
    <Table dataSource={movies} columns={tableHeadings} />

    {/* Movie Form Modal */}
    {isModalOpen && (
      <MovieForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        formType={formType}
        getData={getData}
      />
    )}

    {/* Delete Modal */}
    {isDeleteModalOpen && (
      <DeleteMovieModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        getData={getData}
      />
    )}
  </>
);

}
export default MovieList;