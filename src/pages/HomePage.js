import React, { useState } from 'react';
import Image from 'react-graceful-image'
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl'



const HomePage = () => {
    
    const [viewport, setViewport] = useState({
        
        latitude: 3.1509741500323534,
        longitude: 101.61543292727245,
        zoom: 15,
        pitch: 40
    });

    const geolocateStyle = {
        top: 0,
        left: 0,
        padding: '10px'
    };
    
    const fullscreenControlStyle = {
        top: 36,
        left: 0,
        padding: '10px'
    };
    
    const navStyle = {
        top: 72,
        left: 0,
        padding: '10px'
    };
    
    const scaleControlStyle = {
        bottom: 36,
        left: 0,
        padding: '10px'
    };
    return (
        <>
            <div className="bg-body-theme">
                <div id="home" className="text-white">
                    <div className="fluid-container d-flex flex-wrap">
                        <div className="home-image hoverImage1">
                            <div className="showImage1Message">
                                <a className="Image1Message text-decoration-none text-orange" href="/grocery"><h1 className="font-italic text-center m-0">Provision Grocery</h1></a>
                            </div>
                            <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80" style={{width:"100%", height:"100%"}}/>
                        </div>
                        <div className="home-image hoverImage2">
                            <div className="showImage2Message">
                                <a className="Image2Message text-decoration-none text-orange" href="/cookbook"><h1 className="font-italic text-center m-0">Provision CookBook</h1></a>
                            </div>
                            <Image src="https://images.unsplash.com/photo-1526991204058-9d45349da374?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" style={{width:"100%", height:"100%"}}/>
                        </div>
                    </div>            
                    <div id="aboutus" ></div>
                    <div className="jumbotron mt-5 bg-body-theme">
                        <h1 className="display-3 text-center m-0">About Us</h1>
                        <div className="text-white row">
                            <div className="col-xl-10">
                                <p className="m-0 text-center lead mt-3" style={{fontSize:"1.5rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis eu non diam phasellus. Ut tortor pretium viverra suspendisse potenti nullam ac. Mauris cursus mattis molestie a iaculis at erat. Orci ac auctor augue mauris augue neque gravida in fermentum. Tellus in metus vulputate eu scelerisque felis. Eget felis eget nunc lobortis mattis aliquam faucibus purus. In tellus integer feugiat scelerisque varius morbi enim nunc. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consectetur adipiscing elit pellentesque habitant morbi tristique senectus. Morbi tincidunt augue interdum velit euismod in. Facilisis gravida neque convallis a cras. Ac auctor augue mauris augue neque gravida in fermentum.</p>

                                <p className="m-0 text-center lead mt-3" style={{fontSize:"1.5rem"}}>Donec adipiscing tristique risus nec feugiat in fermentum. Placerat in egestas erat imperdiet. Nunc vel risus commodo viverra. Justo eget magna fermentum iaculis eu. Dignissim convallis aenean et tortor at risus viverra adipiscing. Volutpat ac tincidunt vitae semper quis. Posuere sollicitudin aliquam ultrices sagittis orci a. Eget sit amet tellus cras adipiscing. Lorem dolor sed viverra ipsum. Cras ornare arcu dui vivamus arcu felis bibendum ut.</p>
                                
                                <p className="m-0 text-center lead mt-3" style={{fontSize:"1.5rem"}}>Nibh ipsum consequat nisl vel pretium lectus quam. Varius vel pharetra vel turpis nunc eget. Vel elit scelerisque mauris pellentesque. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Convallis a cras semper auctor neque vitae. Nunc non blandit massa enim nec dui. Habitant morbi tristique senectus et netus. Auctor urna nunc id cursus metus aliquam eleifend mi in. Faucibus ornare suspendisse sed nisi. Tincidunt vitae semper quis lectus nulla at volutpat diam ut. Donec massa sapien faucibus et molestie ac feugiat. Quis commodo odio aenean sed adipiscing diam donec. Vel pretium lectus quam id leo in vitae turpis massa. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum enim. Quam pellentesque nec nam aliquam. Sodales ut etiam sit amet nisl purus. Tempus quam pellentesque nec nam aliquam sem et tortor. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum dui. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sem integer vitae justo eget magna.</p>
                                
                            </div>
                            <div className="col-xl-2">
                                <img src="https://media.discordapp.net/attachments/831720701038821416/835103015114375168/a7ac249227464b9fbb58433eadb931bd.png" style={{width:'100%'}}/>
                            </div>
                        </div>
                    </div>
                    <div id="contactus"></div>
                    <div className="container-fluid bg-body-theme mt-5 px-5">
                        <div className="text-white">
                            <h1 className="display-3 text-center m-0 mb-5"> <i class="far fa-address-book"></i> Contact Us</h1>
                            <div className="d-flex flex-wrap">
                                <div className="d-flex justify-content-center flex-wrap flex-grow-1">
                                    <div>     
                                        <h2 className="ml-0 mt-0 mb-0 mr-3"><i class="fas fa-map-marker-alt mr-3 mb-3"></i>Location : </h2>
                                    </div>
                                    <div className="map-size mb-5">
                                    <ReactMapGL
                                        {...viewport}
                                        width="100%"
                                        height="100%"
                                        mapStyle={'mapbox://styles/mapbox/dark-v9'}
                                        onViewportChange={setViewport}
                                        mapboxApiAccessToken={"pk.eyJ1Ijoia2V2aW5jaGFuOTUwIiwiYSI6ImNrbnJkcGN6ZTBnamkydXBoNjB6Y2pjaGwifQ.8uyY-FtIT0fdXn5rOL38Ew"}
                                    >

                                        <GeolocateControl style={geolocateStyle} />
                                        <FullscreenControl style={fullscreenControlStyle} />
                                        <NavigationControl style={navStyle} />
                                        <ScaleControl style={scaleControlStyle} />
                                        <Marker latitude={3.1509741500323534} longitude={101.61543292727245} offsetTop={(-viewport.zoom*5)/2}>
                                            <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" width={viewport.zoom * 5} height={viewport.zoom * 5} />
                                        </Marker>
                                    </ReactMapGL>
                                    </div>
                                </div>
                                <div className="d-flex px-5 flex-wrap">
                                    <div className="text-left mr-5">
                                        <h2 className="m-0 mb-3">Grocery Address:</h2>
                                        <div>
                                            Lot327, City Center No 1, Lebuh Bandar Utama,
                                        </div>
                                        <div>
                                            Bandar Utama, 47800 Petaling Jaya,
                                        </div>
                                        <div className="mb-5">
                                            Selangor
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <h2 className="m-0">Contact:</h2>
                                        <div>
                                            <i class="fas fa-phone"></i> : +03-1234 5678
                                        </div>
                                        <div className="mb-3">
                                            <i class="far fa-envelope"></i> : provision@provision.com
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;