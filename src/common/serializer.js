import {types, ops} from 'gxbjs';
import ByteBuffer from 'bytebuffer';
import {cloneDeep} from 'lodash';

function isArrayType (type) {
    return type.indexOf('[]') !== -1;
}

export const serializeCallData = (action, params, abi) => {
    abi = cloneDeep(abi);
    let struct = abi.structs.find(s => s.name === action);
    let b = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    struct.fields.forEach(f => {
        let value = params[f.name];
        let isArrayFlag = false;
        if (isArrayType(f.type)) {
            isArrayFlag = true;
            f.type = f.type.split('[')[0];
        }

        let type = types[f.type];
        if (!type) {
            let t = abi.types.find(t => t.new_type_name === f.type);
            if (t) {
                type = types[t.type];
            }
        }
        if (!type) {
            type = ops[f.type];
        }

        if (type) {
            if (isArrayFlag) {
                type = types.set(type);
            }
            type.appendByteBuffer(b, value);
        }
    });
    return Buffer.from(b.copy(0, b.offset).toBinary(), 'binary');
};
