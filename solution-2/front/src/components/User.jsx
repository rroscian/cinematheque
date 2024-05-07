const User = () => {
  
  /**
   * Cette fonction déconnecte l'utilisateur de la cinémathèque
   */
  const deco = () => {
    localStorage.setItem("isAuth", false);
    setIsAuth(localStorage.getItem("isAuth"));

    localStorage.setItem("user", null);
    setUser(localStorage.getItem("user"));
  }

  return (
    <>
    
      {isAuth == "true" ? <button onClick={deco}>Déconnexion</button> : null }
    </>
  )
}