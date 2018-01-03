/**
 * Created by leo on 2017/2/27.
 */
ModelLoader = function (opts) {
    var THIS = this;

    var modelData = opts.data;

    var container = document.getElementById("container");
    //scene
    var scene = new THREE.Scene();
    //camera
    var camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000000);
    // camera.position.set(0, 0, 0);

    //render
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    console.log( container.clientWidth, container.clientHeight )
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x575757, 0);
    container.appendChild(renderer.domElement);

    var lightParms = opts.lights;
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;

    controls.addEventListener('start', function () {
        //controls.autoRotate = false;
    });

    controls.addEventListener('end', function () {
        // setTimeout(function () {
        //     controls.autoRotate = true;
        // }, 3000);

    });

    var object3d = new THREE.Object3D();
    scene.add(object3d);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();
    var isPick;

    function onMouseDown(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        pick();

    }

    function onMouseUp(event) {

        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        pick(true);

    }

    function pick(dir) {

        if (mouse.x === 0 && mouse.y === 0) return;
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects(object3d.children, true);

        if (intersects.length > 0) {
            var intersected = searchModelFromChild(intersects[0].object);

            if (dir && isPick === intersected && intersected.userData.originData) {
                var url = intersected.userData.originData.url;
                layer.confirm('是否打开' + '<span style="color: red;">'+url+'</span> ?', {
                    btn: ['确定', '取消'],
                    btn1: function() {
                        window.open(url);
                        layer.closeAll();
                    }
                });
                renderer.render(scene, camera);
                isPick = null;
            } else {
                isPick = intersected;
            }
        }

    }

    function searchModelFromChild(child) {
        while (child) {
            if (child.userData.interactive) {
                return child;
            }
            child = child.parent;
        }
    }

    container.addEventListener('mousedown', onMouseDown, false);
    container.addEventListener('mouseup', onMouseUp, false);

    window.requestAnimationFrame(render);

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);

    }

    loadModel(opts.modelUrl, opts.modelName, { x: 0, y: 0, z: 0 });
    render();

    function render() {
        requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
    }

    function loadModel(folder, name, position) {
        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {
            $("#loadingContainer").hide();
            opts.callback && opts.callback();
            // console.log(item, loaded, total);
        };

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                $("#progress-bar").css("width", Math.round(percentComplete, 2) + '%');
                //$("#percentage").text(Math.round(percentComplete, 2) + '%');

                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
            else {
                $("#progress-bar").css("width", '50%');
                //$("#percentage").text('50%');
            }
        };

        
        var objLoader = new THREE.OBJLoader(manager);
        // var mtlLoader = new THREE.MTLLoader();
        // mtlLoader.setBaseUrl(folder);
        // mtlLoader.setPath(folder);
        // mtlLoader.load(name + ".mtl", function (materials) {
        // var material = new THREE.MeshNormalMaterial({
        //     wireframe: true
        // });

        // object.material = material;
        // objLoader.setMaterials(material);
        objLoader.load(folder + name + ".obj", function (object) {
            
            object.children.forEach(function (item) {
                
                var son = item.clone();
                var aData = analysis(son.name);

                if (aData.id === "02" && aData.type === "b") {
                    return;
                }
                
                var userData = searchData(aData.id, aData.type, modelData);

                var materialWireframe = new THREE.MeshPhongMaterial({
                    color: 0xffffff,
                    specular: 0xeeeeee,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.03
                });
                son.material = materialWireframe;

                var edges = new THREE.EdgesGeometry(son.geometry);
                var line = new THREE.LineSegments(edges);
                line.name = "line";
                
                var sonObj = new THREE.Object3D();
                sonObj.add(son, line);
                
                sonObj.translateY(-50);
                
                sonObj.userData = userData;
                var name = aData.type + "_" + aData.id;
                sonObj.name = name;
                
                // console.log(userData.originData)
                if (userData.originData) {
                    object3d.add(sonObj);
                    var status = userData.originData.status;
                    var type = userData.originData.type;
                    THIS.updateStatus( name, status, type );
                } else {
                    scene.add(sonObj);
                    THIS.updateStatus( name );
                }
            });

            object3d.position.set(position.x, position.y, position.z);
            fitCameraLight(object3d);
            // $("#progress-bar").css("width", '100%');
        }, onProgress);

        // });


    }

    this.updateStatus = function(name, status, type, onWarn, onError) {
        var parent = scene.getObjectByName(name);
        if (!parent) return;
        var targetLine = parent.getObjectByName('line');
        var color;
        if (status === 0) {
            switch (type) {
                case 'a':
                    color = new THREE.Color( 0x00ff00 );
                    break;
                case 'b':
                    color = new THREE.Color( 0x0000ff );
                    break;
                case 'c':
                    color = new THREE.Color( 0x00deff );
                    break;
            }
        } else if (status === 1) {
            color = new THREE.Color( 0xed9a0a );
            layer.alert('零件 【' + '<span style="font-weight: bold; color: #ed9a0a;">'+name+'</span>' + '】 存在异常，请注意！', {icon: 7});
            onWarn && onWarn();
        } else if (status === 2) {
            color = new THREE.Color( 0xff0000 );
            layer.alert('零件 【' + '<span style="font-weight: bold; color: #ff0000;">'+name+'</span>' + '】 出现故障，请注意！', {
                icon: 2,
                yes: function(index) {
                    audioCtl(true);
                    layer.close(index);
                }
            });
            audioCtl();
            onError && onError();
        } else {
            color = new THREE.Color( 0x19477d );
            // targetLine.material.transparent = true;
            // targetLine.material.alphaTest = 0.1;
        }
        targetLine.material.color = color;
    }

    function audioCtl(status) {
        var audio = document.getElementById('alarm');
        if (status) {
            audio.pause();
        } else {
            audio.play();
        }
    }

    function analysis(str) {
        var res = {
            id: "",
            type: ""
        };
        // S_LinJian_a_9
        str.replace(/S_LinJian_(\w)_(\d+)/g, function() {
            res.type = arguments[1];
            res.id = arguments[2];
        });
        return res;
    }

    function searchData(id, type, group) {
        var res;
        group.forEach(function (item) {
            if (item.id === id && item.type === type) {
                res = item;
            }
        });
        return {
            originData: res,
            interactive: true
        };
    }

    function fitCameraLight(object3d) {
        var b = new THREE.Box3().setFromObject(object3d);
        var size = b.getSize();
        var max = size.x > size.y ? size.x : size.y;
        var offset = 0.4;
        var camera_z = (max / 2 / offset) * 2;
        // if (camera_z < 100)
        //     camera_z = 100;
        camera.position.set(0, 0, camera_z);
        camera.lookAt(object3d.position);
        var lightOffset = 2;
        var params = [
            [0, size.y * lightOffset, 0],//top
            [0, -size.y * lightOffset, 0],//bottom
            [-size.x * lightOffset, 0, 0],//left
            [size.x * lightOffset, 0, 0],//right
            [0, 0, size.z * lightOffset],//front
            [0, 0, -size.z * lightOffset]//rear
        ];

        for (var i = 0; i < params.length; i++) {
            var parm = params[i];
            var light = new THREE.DirectionalLight(lightParms[i][0], lightParms[i][1]);
            light.position.set(parm[0], parm[1], parm[2]);
            scene.add(light);
            // var lightDirectHelper = new THREE.DirectionalLightHelper(light);
            // scene.add(lightDirectHelper);
        }

        //lights
        var lightAm = new THREE.AmbientLight(lightParms[6][0], lightParms[6][1]);
        scene.add(lightAm);

        controls.minDistance = size.z * 0.5;
        controls.maxDistance = 10 * size.z;

    }

};