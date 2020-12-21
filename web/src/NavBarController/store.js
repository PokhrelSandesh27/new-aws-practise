import React from "react";
import useGlobalHook from "use-global-hook";

import * as actions from "./actions";

const open = {
            toggle:true
};


const useGlobal = useGlobalHook(React, open, actions);

export default useGlobal;
