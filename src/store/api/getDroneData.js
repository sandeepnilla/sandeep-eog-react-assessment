import "isomorphic-fetch";

const getDroneData = async () => {
  // Using the create-react-app's proxy for CORS issues
  const response = await fetch(
    `https://react-assessment-api.herokuapp.com/api/drone`
  );

  console.log(response);
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return { data: json };
};

export default getDroneData;