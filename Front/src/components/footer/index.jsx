
///////////////////////////////////////////////////////////////
const Footer = ({url}) => {

    return (
        <section className="">
        <footer className="text-center text-white" style= {{"background-color": "#e9ecef"}}>

          <div className="container p-4 pb-0">

            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                
                <a href={ url } target="_blank" className="btn btn-primary btn-outline-light btn-rounded">
                  Download
                </a>
              </p>
            </section>

          </div>

      

          <div className="text-center p-3" style={{"background-color":"rgba(0, 0, 0, 0.2)"}}>
            © 2020 Copyright:
            <a className="text-white" href="https://github.com/pauloperozo"> github.com/pauloperozo</a>
          </div>

        </footer>
      </section>
    )
}
///////////////////////////////////////////////////////////////
export default Footer
///////////////////////////////////////////////////////////////