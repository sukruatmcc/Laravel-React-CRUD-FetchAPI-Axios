import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const StudentCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({
    name: "",
    course: "",
    phone: "",
  });

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const studentCreate = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      name: student.name,
      course: student.course,
      phone: student.phone,
    };

    axios
      .post(`http://127.0.0.1:8000/api/student-create`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/students");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
        }
      });
  };
  return (
    <>
      {loading && <Loading />}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Student Create
                  <Link className="btn btn-secondary float-end" to="/students">
                    Student Index
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={studentCreate}>
                  <div class="mb-3">
                    <label for="name" class="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={student.name}
                      onChange={handleInput}
                      type="text"
                      class="form-control"
                    />
                    <span class="text-danger">{inputErrorList.name}</span>
                  </div>
                  <div class="mb-3">
                    <label for="course" class="form-label">
                      Course
                    </label>
                    <input
                      id="course"
                      name="course"
                      value={student.course}
                      onChange={handleInput}
                      type="text"
                      class="form-control"
                    />
                    <span class="text-danger">{inputErrorList.course}</span>
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={student.phone}
                      onChange={handleInput}
                      type="text"
                      class="form-control"
                    />
                    <span class="text-danger">{inputErrorList.phone}</span>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCreate;
