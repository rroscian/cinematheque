const User = () => {
  
  const deco = () => {
    localStorage.setItem("isAuth", false);
    setIsAuth(localStorage.getItem("isAuth"));

    localStorage.setItem("user", null);
    setUser(localStorage.getItem("user"));
  }

  return (
    <>
    </>
  )
}