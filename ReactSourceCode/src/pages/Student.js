import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://127.0.0.1:8000/api/students")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setStudents(data.students);
          setLoading(false);
        })
        .then((err) => console.log(err));
    }, 1000);
  }, []);

  const studentDelete = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";
    axios
      .delete(`http://127.0.0.1:8000/api/student-delete/${id}`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Students
                  <Link
                    to="/student-create"
                    className="btn btn-primary float-end"
                  >
                    Add Student
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Course</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <div>
                        <Loading />.
                      </div>
                    )}
                    {students?.map((item, index) => (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.course}</td>
                        <td>
                          <Link
                            className="btn btn-primary justify-content"
                            style={{ marginRight: "5px" }}
                            to={`/student-edit/${item.id}`}
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger  ml-3"
                            onClick={(e) => studentDelete(e, item.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
