import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const StudentEdit = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // API'den mevcut veriyi çekme
    fetch(`http://127.0.0.1:8000/api/student-edit/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // API'ye güncelleme isteği gönderme
    fetch(`http://127.0.0.1:8000/api/student-update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedData) => console.log("Updated data:", updatedData))
      .then(navigate("/students"))
      .catch((error) => console.error("Error updating data:", error));
  };

  return (
    <>
      {/* {loading && <Loading />} */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Student Edit
                  <Link className="btn btn-secondary float-end" to="/students">
                    Student Index
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdate}>
                  <div class="mb-3">
                    <label for="name" class="form-label">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="course" class="form-label">
                      Course
                    </label>
                    <input
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="phone" class="form-label">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="text"
                      class="form-control"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Edit
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

export default StudentEdit;
