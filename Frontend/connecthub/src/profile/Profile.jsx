import { useEffect, useState } from "react"; import { Edit3, Plus, X, Save, MapPin, Mail, Phone, Globe, Linkedin, Github, Briefcase, GraduationCap, Award, Calendar, Building } from "lucide-react";
import apiService from '../AuthUtils/apiService.jsx';

export default function LinkedInProfile() {



  const [profileDetails, setProfileDetails] = useState({
    fullName: "",
    headline: "",
    summary: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    linkedinUrl: "",
    githubUrl: "",
    websiteUrl: "",
    showPhoneNumber: false,
    username: "",
    email: ""
  });







  // Experience state
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      company: "Tech Corp",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      current: true,
      description:
        "Lead development of microservices architecture, mentor junior developers, and collaborate with cross-functional teams.",
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "Remote",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      current: false,
      description:
        "Developed full-stack web applications using React and Node.js. Improved application performance by 40%.",
    },
  ])


  const [education, setEducation] = useState([]);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiService.getProfileDetails();
        const data = response.data.data;
        setProfileDetails(data);
        setEducation(data.educationList);
        console.log("Profile Response:", response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);



  // Skills state
  const [skills, setSkills] = useState([
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Docker",
    "MongoDB",
    "PostgreSQL",
    "Git",
    "Agile",
  ])

  // Edit states
  const [editingProfile, setEditingProfile] = useState(false)
  const [editingAbout, setEditingAbout] = useState(false)
  const [editingContact, setEditingContact] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null)
  const [editingEducation, setEditingEducation] = useState(null)
  const [addingExperience, setAddingExperience] = useState(false)
  const [addingEducation, setAddingEducation] = useState(false)
  const [newSkill, setNewSkill] = useState("")


  const [tempProfile, setTempProfile] = useState(profileDetails)
  const [tempExperience, setTempExperience] = useState({})
  const [tempEducation, setTempEducation] = useState({})


  const handleEditProfile = () => {
    console.log(profileDetails.summary)
    setTempProfile({
      name: profileDetails.username,
      headline: profileDetails.headline,
      location: profileDetails.country,
      summary: profileDetails.summary

    });
    setEditingProfile(true)
  }

  const handleSaveProfile = () => {
    setProfileDetails(tempProfile)
    setEditingProfile(false)
  }

  const handleCancelProfile = () => {
    setTempProfile(profileDetails)
    setEditingProfile(false)
  }

  // About editing functions
  const handleEditAbout = () => {
    setTempProfile({ ...tempProfile, summary: profileDetails.summary })
    setEditingAbout(true)
  }

  const handleSaveAbout = () => {
    setProfileDetails({ ...profileDetails, about: tempProfile.about })
    setEditingAbout(false)
  }

  // Contact editing functions
  const handleEditContact = () => {
    setTempProfile(profileDetails)
    setEditingContact(true)
  }

  const handleSaveContact = () => {
    setProfileDetails(tempProfile)
    setEditingContact(false)
  }

  // Experience functions
  const handleAddExperience = () => {
    setTempExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
    setAddingExperience(true)
  }

  const handleSaveNewExperience = () => {
    const newExp = {
      ...tempExperience,
      id: Date.now(),
    }
    setExperiences([newExp, ...experiences])
    setAddingExperience(false)
    setTempExperience({})
  }

  const handleEditExperience = (exp) => {
    setTempExperience(exp)
    setEditingExperience(exp.id)
  }

  const handleSaveExperience = () => {
    setExperiences(experiences.map((exp) => (exp.id === editingExperience ? tempExperience : exp)))
    setEditingExperience(null)
    setTempExperience({})
  }

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id))
  }

  // Education functions
  const handleAddEducation = () => {
    setTempEducation({
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: "",
    })
    setAddingEducation(true)
  }

  const handleSaveNewEducation = () => {
    const newEdu = {
      ...tempEducation,
      id: Date.now(),
    }
    setEducation([newEdu, ...education])
    setAddingEducation(false)
    setTempEducation({})
  }

  const handleEditEducation = (edu) => {
    setTempEducation(edu)
    setEditingEducation(edu.id)
  }

  const handleSaveEducation = () => {
    setEducation(education.map((edu) => (edu.id === editingEducation ? tempEducation : edu)))
    setEditingEducation(null)
    setTempEducation({})
  }

  const handleDeleteEducation = (id) => {
    setEducation(education.filter((edu) => edu.id !== id))
  }

  // Skills functions
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={profileDetails.profileImage || "/placeholder.svg"}
                  alt={profileDetails.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none"
                    e.target.nextSibling.style.display = "flex"
                  }}
                />
                <div className="w-full h-full bg-blue-500 text-white text-2xl font-bold flex items-center justify-center hidden">
                  {profileDetails.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
            </div>

            <div className="flex-1">
              {editingProfile ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={tempProfile.name}
                    onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 text-2xl font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={tempProfile.headline}
                    onChange={(e) => setTempProfile({ ...tempProfile, headline: e.target.value })}
                    placeholder="Professional Headline"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={tempProfile.location}
                    onChange={(e) => setTempProfile({ ...tempProfile, location: e.target.value })}
                    placeholder="Location"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelProfile}
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{profileDetails.username}</h1>
                      <p className="text-lg text-gray-600 mt-1">{profileDetails.headline}</p>
                      <div className="flex items-center mt-2 text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{profileDetails.country}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleEditProfile}
                      className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">About</h2>
          <button
            onClick={handleEditAbout}
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </button>
        </div>
        <div className="p-6">
          {editingAbout ? (
            <div className="space-y-4">
              <textarea
                value={tempProfile.summary}
                onChange={(e) => setTempProfile({ ...tempProfile, summary: e.target.value })}
                placeholder="Write about yourself..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSaveAbout}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setEditingAbout(false)}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">{profileDetails.summary}</p>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Experience
          </h2>
          <button
            onClick={handleAddExperience}
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Add New Experience Form */}
          {addingExperience && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={tempExperience.title}
                  onChange={(e) => setTempExperience({ ...tempExperience, title: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={tempExperience.company}
                  onChange={(e) => setTempExperience({ ...tempExperience, company: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={tempExperience.location}
                  onChange={(e) => setTempExperience({ ...tempExperience, location: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tempExperience.current}
                    onChange={(e) => setTempExperience({ ...tempExperience, current: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">Current Position</label>
                </div>
                <input
                  type="text"
                  placeholder="Start Date"
                  value={tempExperience.startDate}
                  onChange={(e) => setTempExperience({ ...tempExperience, startDate: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {!tempExperience.current && (
                  <input
                    type="text"
                    placeholder="End Date"
                    value={tempExperience.endDate}
                    onChange={(e) => setTempExperience({ ...tempExperience, endDate: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
              <textarea
                placeholder="Description"
                value={tempExperience.description}
                onChange={(e) => setTempExperience({ ...tempExperience, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNewExperience}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setAddingExperience(false)}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Experience List */}
          {experiences.map((exp, index) => (
            <div key={exp.id}>
              {editingExperience === exp.id ? (
                <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={tempExperience.title}
                      onChange={(e) => setTempExperience({ ...tempExperience, title: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={tempExperience.company}
                      onChange={(e) => setTempExperience({ ...tempExperience, company: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={tempExperience.location}
                      onChange={(e) => setTempExperience({ ...tempExperience, location: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={tempExperience.current}
                        onChange={(e) => setTempExperience({ ...tempExperience, current: e.target.checked })}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm text-gray-700">Current Position</label>
                    </div>
                    <input
                      type="text"
                      placeholder="Start Date"
                      value={tempExperience.startDate}
                      onChange={(e) => setTempExperience({ ...tempExperience, startDate: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {!tempExperience.current && (
                      <input
                        type="text"
                        placeholder="End Date"
                        value={tempExperience.endDate}
                        onChange={(e) => setTempExperience({ ...tempExperience, endDate: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                  <textarea
                    placeholder="Description"
                    value={tempExperience.description}
                    onChange={(e) => setTempExperience({ ...tempExperience, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveExperience}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingExperience(null)}
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <Building className="w-5 h-5 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-gray-600">{exp.company}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                          </span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {index < experiences.length - 1 && <hr className="mt-6 border-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Education
          </h2>
          <button
            onClick={handleAddEducation}
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Add New Education Form */}
          {addingEducation && (
            <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="School"
                  value={tempEducation.school}
                  onChange={(e) => setTempEducation({ ...tempEducation, school: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={tempEducation.degree}
                  onChange={(e) => setTempEducation({ ...tempEducation, degree: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={tempEducation.field}
                  onChange={(e) => setTempEducation({ ...tempEducation, field: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Start Year"
                    value={tempEducation.startDate}
                    onChange={(e) => setTempEducation({ ...tempEducation, startDate: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    value={tempEducation.endDate}
                    onChange={(e) => setTempEducation({ ...tempEducation, endDate: e.target.value })}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <textarea
                placeholder="Description"
                value={tempEducation.description}
                onChange={(e) => setTempEducation({ ...tempEducation, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveNewEducation}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setAddingEducation(false)}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Education List */}
          {education.map((edu, index) => (
            <div key={edu.id}>
              {editingEducation === edu.id ? (
                <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="School"
                      value={tempEducation.school}
                      onChange={(e) => setTempEducation({ ...tempEducation, school: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={tempEducation.degree}
                      onChange={(e) => setTempEducation({ ...tempEducation, degree: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={tempEducation.field}
                      onChange={(e) => setTempEducation({ ...tempEducation, field: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Start Year"
                        value={tempEducation.startDate}
                        onChange={(e) => setTempEducation({ ...tempEducation, startDate: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="End Year"
                        value={tempEducation.endDate}
                        onChange={(e) => setTempEducation({ ...tempEducation, endDate: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={tempEducation.description}
                    onChange={(e) => setTempEducation({ ...tempEducation, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEducation}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEducation(null)}
                      className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <GraduationCap className="w-5 h-5 mt-1 text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                        <p className="text-gray-600">
                          {edu.degree} in {edu.field}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>
                            {edu.startDate} - {edu.endDate}
                          </span>
                        </div>
                        {edu.description && <p className="mt-2 text-sm text-gray-700">{edu.description}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditEducation(edu)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {index < education.length - 1 && <hr className="mt-6 border-gray-200" />}
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Skills
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full border border-gray-200"
              >
                {skill}
                <X className="w-3 h-3 cursor-pointer hover:text-red-600" onClick={() => handleRemoveSkill(skill)} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
          <button
            onClick={handleEditContact}
            className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </button>
        </div>
        <div className="p-6">
          {editingContact ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={tempProfile.email}
                    onChange={(e) => setTempProfile({ ...tempProfile, email: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={tempProfile.phone}
                    onChange={(e) => setTempProfile({ ...tempProfile, phone: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    placeholder="Website"
                    value={tempProfile.website}
                    onChange={(e) => setTempProfile({ ...tempProfile, website: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    placeholder="LinkedIn"
                    value={tempProfile.linkedin}
                    onChange={(e) => setTempProfile({ ...tempProfile, linkedin: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    placeholder="GitHub"
                    value={tempProfile.github}
                    onChange={(e) => setTempProfile({ ...tempProfile, github: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveContact}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </button>
                <button
                  onClick={() => setEditingContact(false)}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileDetails.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{profileDetails.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-500" />
                <a
                  href={profileDetails.websiteUrl}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileDetails.websiteUrl}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-gray-500" />
                <a
                  href={profileDetails.linkedinUrl}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-500" />
                <a
                  href={profileDetails.github}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
