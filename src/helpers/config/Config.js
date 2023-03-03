const build_config = ( obj ) => {

    let sct_total = obj.sectors;
    let arm = obj.arms;
    let con = obj.con;
    let bdg = obj.bdgs;

    let str_out = "";

    if ( (bdg < sct_total) || (arm < sct_total)) { console.log("Unautorized"); }

    else{

        if (!str_out) {

            str_out = `${sct_total},${bdg}.${arm}*`;

            for (let index = 0; index < str_out.length; index++) {

                if (str_out[index] === "*") {
                    
                    switch (con) {

                        case 1:
                            for (const key in obj.config) {

                                let element = obj.config[key];
                                
                                for (const y in element) {

                                    let comp = element[y];

                                    for (const k in comp) {

                                        console.log("Sector " + key + " Bodega " + k + " Contiene " + comp[k] + " Armarios");
                                        str_out += `${key};${k}!${comp[k]}=`;

                                    }

                                }

                                console.log();

                            }
                            break;

                        case 2:
                            updateConfig();
                            break;

                        case 3:
                            getConfig();
                            break;

                        default:
                            break;

                    }

                }
            
            }

        }

    }

    return str_out;
}

const updateConfig = () => {}

const getConfig = () => {}

let obj = {

    "config":
        {

            1: [ 3 , { 1: 2, 2: 2, 3: 2 } ],
            2: [ 3 , { 1: 2, 2: 2, 3: 2 } ],
            3: [ 3 , { 1: 2, 2: 2, 3: 2 } ],
            4: [ 3 , { 1: 2, 2: 2, 3: 2 } ],
            5: [ 3 , { 1: 2, 2: 2, 3: 2 } ]
            
        },
    "sectors" : 5,
    "arms" : 30,
    "bdgs" : 15,
    "con" : 1

};

console.log(build_config(obj));