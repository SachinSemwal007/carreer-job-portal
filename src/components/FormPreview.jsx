//FormPreview-final

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import Image from "next/image";

const FormPreview = ({ 
  titlejob, 
  createdAt, 
  updatedAt, 
  date,
  show, // to control modal visibility
  handleClose, // function to close modal
  firstName,
  middleName,
  lastName,
  fhName,
  email,
  gender,
  sport,
  dob,
  age,
  maritalStatus,
  address,
  pincode,
  country,
  state,
  district,
  isHandicapped,
  isExService,
  community,
  matriculationYear,
  matriculationGrade,
  matriculationPercentage,
  matriculationBoard,
  interYear,
  interGrade,
  interPercentage,
  interBoard,
  bachelorYear,
  bachelorCourse,
  bachelorSpecialization,
  bachelorGrade,
  bachelorPercentage,
  bachelorUniversity,
  masterYear,
  masterCourse,
  masterSpecialization,
  masterGrade,
  masterPercentage,
  masterUniversity,
  courses,
  experiences,
  references,
  achievement,
  description,
  passportPhoto,
  signature,
  _id,
}) => {
  const { id } = useParams();
  // const id = _id;
  function getStringBeforeQuestionMark(inputString) {
    const index = inputString.indexOf("?");
    return index !== -1 ? inputString.substring(0, index) : inputString;
  }
  const handleDownloadPDF = () => {
    const modalHeader = document.getElementById("modal-header");
    const modalContent = document.getElementById("modal-content");

    // Capture the full content
    modalContent.style.height = "auto"; // Set height to auto to capture full content
    modalContent.style.maxHeight = "none"; // Remove max-height restriction
    modalContent.style.overflow = "visible"; // Set overflow to visible

    // Create a temporary wrapper for capturing
    const wrapper = document.createElement("div");
    wrapper.appendChild(modalHeader.cloneNode(true));
    wrapper.appendChild(modalContent.cloneNode(true));
    document.body.appendChild(wrapper); // Temporarily add to DOM for capture

    // Use html2canvas to capture the entire content
    html2canvas(wrapper, {
      scale: 2, // Higher scale for better image quality
      useCORS: true, // Handle cross-origin issues
      scrollY: 0, // Handle scrolling
      scrollX: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add image data to PDF and handle multi-page content
      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
        if (heightLeft > 0) {
          position -= pdfHeight;
          pdf.addPage();
        }
      }

      // Restore the original modal content styles directly
      modalContent.style.height = ""; // Reset height to default
      modalContent.style.maxHeight = ""; // Reset max-height to default
      modalContent.style.overflow = "auto"; // Set overflow back to auto

      // Remove the temporary wrapper
      document.body.removeChild(wrapper);

      // Save the PDF
      pdf.save("form-preview.pdf");
    });
  };
  function checktitle(title) { 
    if (title == "CO")return "Coach"   
    else if (title == "AC") return "Assistant Coach"; 
    else if (title == "HC") return "Head Coach"; 
  } 
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className=" max-w-6xl mx-auto my-4 p-5 bg-white shadow-lg rounded-lg w-full sm:w-[90vw] md:w-[80vw] h-[100svh] overflow-hidden"
    >
      <Modal.Header
        className="flex flex-col  border-b-2 border-gray-200 p-4 w-full bg-white z-10 rounded-t-lg"
        id="modal-header"
      >
        <div className="flex flex-wrap items-center justify-center sm:flex-wrap ">
          <Image
            src="/JSSPS-Logo.png"
            alt="JSSP Logo"
            width={100}
            height={100}
            className="h-12 object-contain sm:h-14"
          />
          <div className="ml-4 text-center">
            <h1 className="text-sm sm:text-lg font-bold">
              Jharkhand State Sports Promotion Society
            </h1>
            <h2 className="text-xs">
              (A State Govt. of Jharkhand and CCL Joint Initiative)
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-2">
          <h2 className="text-xs sm:text-base font-bold">
            Applied For:{" "}
            <span className="text-red-500">{checktitle(titlejob)}</span>
          </h2>
          <h2 className="text-xs sm:text-base font-bold">
            Application ID: <span className="text-blue-500">N/A</span> 
          </h2>
          <h2 className="text-xs sm:text-base font-bold">
            Date:{" "}
            <span className="text-gray-600">
              {date || " "}
            </span>
          </h2>
        </div>
      </Modal.Header>
      <Modal.Body
        className="w-full max-w-full overflow-y-auto max-h-[calc(100vh-250px)] p-4"
        id="modal-content"
      >
        <h4 className="text-xl font-semibold mb-2">Personal Details</h4>
        {/* Personal Information */}
        <div className="flex justify-between items-start my-4">
          <div className="w-2/3 space-y-2">
            <p>
              <strong>Name:</strong> {firstName} {middleName} {lastName}
            </p>
            <p>
              <strong>Father/Husband Name:</strong> {fhName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Sport:</strong> {sport}
            </p>
            <p>
              <strong>Date of Birth:</strong> {dob}, <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Marital Status:</strong> {maritalStatus}
            </p>
            <p>
              <strong>Address:</strong> {address}, {district}, {state},{" "}
              {country}, {pincode}
            </p>
            <p>
              <strong>Community:</strong> {community}
            </p>
            <p>
              <strong>Is Handicapped:</strong> {isHandicapped}
            </p>
            <p>
              <strong>Is ExService Man:</strong> {isExService}
            </p>
          </div>
          {/* Display Passport Photo */}
          {passportPhoto && (
            <div className="w-1/3 flex justify-center">
              <div className="w-35 h-40 border border-black">
                <Image
                  src={getStringBeforeQuestionMark(passportPhoto)}
                  alt="Passport"
                  width={35}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Matriculation Section */}
        <h4 className="text-xl font-semibold mt-4">Matriculation</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course/Grade</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">Board/University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  {matriculationYear}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationGrade}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationBoard}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Intermediate Section */}
        <h4 className="text-xl font-semibold mt-4">Intermediate/+2</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course/Grade</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">Board/University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{interYear}</td>
                <td className="border border-gray-300 p-2">{interGrade}</td>
                <td className="border border-gray-300 p-2">
                  {interPercentage}
                </td>
                <td className="border border-gray-300 p-2">{interBoard}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bachelor Section */}
        <h4 className="text-xl font-semibold mt-4">
          Bachelor Degree/Graduation/(10+2+3)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Specialization</th>
                <th className="border border-gray-300 p-2">Grade/Division</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{bachelorYear}</td>
                <td className="border border-gray-300 p-2">{bachelorCourse}</td>
                <td className="border border-gray-300 p-2">
                  {bachelorSpecialization}
                </td>
                <td className="border border-gray-300 p-2">{bachelorGrade}</td>
                <td className="border border-gray-300 p-2">
                  {bachelorPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {bachelorUniversity}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Master Section */}
        <h4 className="text-xl font-semibold mt-4">
          Master Degree/Post Graduation/(10+2+3+2)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Specialization</th>
                <th className="border border-gray-300 p-2">Grade/Division</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{masterYear}</td>
                <td className="border border-gray-300 p-2">{masterCourse}</td>
                <td className="border border-gray-300 p-2">
                  {masterSpecialization}
                </td>
                <td className="border border-gray-300 p-2">{masterGrade}</td>
                <td className="border border-gray-300 p-2">
                  {masterPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {masterUniversity}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Professional Course Details */}
        <h4 className="text-xl font-semibold mt-4">
          Professional Qualification/Diploma/Certificate Course
        </h4>
        {courses && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Course Name</th>
                  <th className="border border-gray-300 p-2">
                    Special Subject
                  </th>
                  <th className="border border-gray-300 p-2">
                    Year of Passing
                  </th>
                  <th className="border border-gray-300 p-2">
                    Duration(months)
                  </th>
                  <th className="border border-gray-300 p-2">Grade/Division</th>
                  <th className="border border-gray-300 p-2">Percent</th>
                  <th className="border border-gray-300 p-2">
                    Name of Institute/College
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {course.courseName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.specialSubject}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.yearOfPassing}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.duration}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.gradeDivision}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.percent}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.instituteName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No professional courses listed.</p>
        )}

        {/* Experience Section */}
        <h4 className="text-xl font-semibold mt-4">Experience</h4>
        {experiences && experiences.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">
                    Office/Instt.Firm/Org
                  </th>
                  <th className="border border-gray-300 p-2">Post</th>
                  <th className="border border-gray-300 p-2">Job Type</th>
                  <th className="border border-gray-300 p-2">From Date</th>
                  <th className="border border-gray-300 p-2">Till Date</th>
                  <th className="border border-gray-300 p-2">Scale of Type</th>
                  <th className="border border-gray-300 p-2">
                    Nature of Duties
                  </th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {experience.orgName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.post}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.jobType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.fromDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.tillDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.scaleOfType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.natureOfDuties}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No experience details available.</p>
        )}

        {/* References Section */}
        <h4 className="text-lg font-semibold mb-4">References</h4>
        {references && references.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Reference Name</th>
                  <th className="border border-gray-300 p-2">Contact</th>
                  <th className="border border-gray-300 p-2">Relation</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {reference.refName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {reference.refContact}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {reference.refRelation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No references listed.</p>
        )}

        {/* Achiement */}
        <h4 className="text-lg font-semibold mb-4">Achievements</h4>
        <p>{achievement}</p>

        {/* Description */}
        <h4 className="text-lg font-semibold mb-4">Describe Yourself</h4>
        <p>{description}</p>

        {/* Declaration*/}
        <div className="mt-5 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm leading-relaxed text-gray-800 text-justify">
          <p className="m-0 text-gray-600 text-[0.9rem]">
            I hereby declare that the information furnished in this Application
            Form is true to the best of my knowledge and belief. If any wrong
            information is detected in the future, my candidature for the post
            may be cancelled at any stage and action can be taken accordingly. I
            also agree with the terms and conditions mentioned in the detailed
            advertisement.
          </p>
        </div>

        <div className="flex justify-between items-start mt-5">
          {/* Left Side: Place and Date */}
          <div className="flex flex-col">
            <p>
              <strong>Place:</strong> {district}
            </p>{" "}
            {/* Placeholder for District */}
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true, // Change to false for 24-hour format
              })}
            </p>{" "}
            {/* Placeholder for current date */}
          </div>

          {/* Right Side: Signature */}
          <div className="flex flex-col items-center">
            {signature && (
              <Image
                src={getStringBeforeQuestionMark(signature)}
                alt="Signature"
                width={32}
                height={18}
                className="w-32 h-18 object-contain border border-gray-300"
              />
            )}
            <p className="mt-2 text-sm text-gray-600">Signature of Candidate</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="w-full bg-white border-t-2 border-gray-200 p-4 flex justify-end rounded-b-lg">
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleClose}
        >
          Close
        </Button>
        {/* <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleDownloadPDF}
        >
          Download as PDF
        </Button> */}

        {/* <Link
          href={certification}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
          Show Certificate
        </Link> */}
      </Modal.Footer>
    </Modal>
  );
};

export default FormPreview;
