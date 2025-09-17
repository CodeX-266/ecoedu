import { useEffect, useState } from "react";
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  arrayUnion 
} from "firebase/firestore";
import { db } from "../firebase";

function Courses() {
  const [userData, setUserData] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all documents from the "courses" collection
        const coursesCollectionRef = collection(db, "courses");
        const coursesSnapshot = await getDocs(coursesCollection-Ref);
        const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllCourses(coursesList);

        // Fetch the current user's data to check their enrollments
        const userDocRef = doc(db, "users", currentUserId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUserId]);

  // Function to handle course enrollment
  const handleEnroll = async (courseId) => {
    if (!currentUserId) return;

    const userDocRef = doc(db, "users", currentUserId);
    try {
      // Use arrayUnion to add the courseId to the user's enrolledCourses
      await updateDoc(userDocRef, {
        enrolledCourses: arrayUnion(courseId)
      });
      
      // Update local state to immediately reflect the change in the UI
      setUserData(prevUserData => ({
        ...prevUserData,
        enrolledCourses: [...(prevUserData.enrolledCourses || []), courseId]
      }));

    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-600 p-8 text-white pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-10">Explore Courses</h1>

        <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
          {allCourses.length > 0 ? (
            <div className="space-y-4">
              {allCourses.map((course) => {
                const isEnrolled = userData?.enrolledCourses?.includes(course.id);
                return (
                  <div
                    key={course.id}
                    className="flex justify-between items-center p-4 bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="text-xl font-medium">{course.name}</h3>
                      <p className="text-gray-400">{course.description}</p>
                    </div>
                    <button
                      onClick={() => handleEnroll(course.id)}
                      disabled={isEnrolled}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        isEnrolled
                          ? "bg-green-600 cursor-not-allowed"
                          : "bg-cyan-600 hover:bg-cyan-700"
                      }`}
                    >
                      {isEnrolled ? "Enrolled ✅" : "Enroll"}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-400">No courses available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;