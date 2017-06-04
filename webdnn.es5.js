var __extends=this&&this.__extends||function(){var g=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(g,b){g.__proto__=b}||function(g,b){for(var a in b)b.hasOwnProperty(a)&&(g[a]=b[a])};return function(k,b){function a(){this.constructor=k}g(k,b);k.prototype=null===b?Object.create(b):(a.prototype=b.prototype,new a)}}(),__awaiter=this&&this.__awaiter||function(g,k,b,a){return new (b||(b=Promise))(function(c,d){function e(c){try{m(a.next(c))}catch(l){d(l)}}function f(c){try{m(a["throw"](c))}catch(l){d(l)}}
		function m(a){a.done?c(a.value):(new b(function(c){c(a.value)})).then(e,f)}m((a=a.apply(g,k||[])).next())})},__generator=this&&this.__generator||function(g,k){function b(c){return function(d){return a([c,d])}}function a(a){if(d)throw new TypeError("Generator is already executing.");for(;c;)try{if(d=1,e&&(f=e[a[0]&2?"return":a[0]?"throw":"next"])&&!(f=f.call(e,a[1])).done)return f;if(e=0,f)a=[0,f.value];switch(a[0]){case 0:case 1:f=a;break;case 4:return c.label++,{value:a[1],done:!1};case 5:c.label++;
		e=a[1];a=[0];continue;case 7:a=c.ops.pop();c.trys.pop();continue;default:if(!(f=c.trys,f=0<f.length&&f[f.length-1])&&(6===a[0]||2===a[0])){c=0;continue}if(3===a[0]&&(!f||a[1]>f[0]&&a[1]<f[3]))c.label=a[1];else if(6===a[0]&&c.label<f[1])c.label=f[1],f=a;else if(f&&c.label<f[2])c.label=f[2],c.ops.push(a);else{f[2]&&c.ops.pop();c.trys.pop();continue}}a=k.call(g,c)}catch(l){a=[6,l],e=0}finally{d=f=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}var c={label:0,sent:function(){if(f[0]&1)throw f[1];
		return f[1]},trys:[],ops:[]},d,e,f,m;return m={next:b(0),"throw":b(1),"return":b(2)},"function"===typeof Symbol&&(m[Symbol.iterator]=function(){return this}),m},WebDNN;(function(g){var k=function(){return function(b,a){this.byteLength=b;this.backed=a}}();g.Buffer=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(b){function a(c){var d=b.call(this,c,"webgpu")||this;0==c&&(c=4);d.buffer=a.webgpuHandler.createBuffer(new Uint8Array(c));d.bufferView=new Uint8Array(d.buffer.contents);return d}__extends(a,b);a.prototype.write=function(c,d){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(f){switch(f.label){case 0:return[4,a.webgpuHandler.sync()];case 1:return f.sent(),e=new c.constructor(this.bufferView.buffer),e.set(c,d),[2]}})})};a.prototype.read=
	function(c,d,e){void 0===d&&(d=0);return __awaiter(this,void 0,void 0,function(){var f,b;return __generator(this,function(h){switch(h.label){case 0:if(!c)throw Error("dst cannot be null");return[4,a.webgpuHandler.sync()];case 1:h.sent();if(0===this.byteLength)return[2];f=c.constructor;b=new f(this.bufferView.buffer,this.bufferView.byteOffset+d*f.BYTES_PER_ELEMENT,e);void 0===e&&(e=b.length-d);c.set(b);return[2]}})})};a.init=function(a){this.webgpuHandler=a};a.prototype.getWriteView=function(a,d,e){return new e(this.bufferView.buffer,
	this.bufferView.byteOffset+a*e.BYTES_PER_ELEMENT,d)};a.prototype.getReadView=function(a,d,e){return new e(this.bufferView.buffer,this.bufferView.byteOffset+a*e.BYTES_PER_ELEMENT,d)};a.prototype.syncWriteViews=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2]})})};a.prototype.syncReadViews=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(c){switch(c.label){case 0:return[4,a.webgpuHandler.sync()];case 1:return c.sent(),
	[2]}})})};return a}(g.Buffer);g.BufferWebGPU=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(){}b.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){if(!b.isBrowserSupported)throw Error("This browser does not support WebGPU");this.context=document.createElement("canvas").getContext("webgpu");this.commandQueue=this.context.createCommandQueue();this.pipelineStates=new Map;return[2]})})};b.prototype.createBuffer=function(a){return this.context.createBuffer(a)};b.prototype.loadKernel=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    c){void 0===c&&(c="");for(var d=this.context.createLibrary(a),e=0,f=d.functionNames;e<f.length;e++){var b=f[e],h=d.functionWithName(b),h=this.context.createComputePipelineState(h);this.pipelineStates.set(c+"."+b,h)}};b.prototype.createCommandBuffer=function(){return this.commandQueue.createCommandBuffer()};b.prototype.getPipelineStateByName=function(a){var c=this.pipelineStates.get(a);if(!c)throw TypeError('Kernel function "'+a+'" is not loaded.');return c};b.prototype.executeSinglePipelineState=
	function(a,c,d,e,b){var f=this.createCommandBuffer(),h=f.createComputeCommandEncoder();h.setComputePipelineState(this.getPipelineStateByName(a));for(a=0;a<e.length;a++){var l=e[a];h.setBuffer(l instanceof g.BufferWebGPU?l.buffer:l,0,a)}h.dispatch(c,d);h.endEncoding();c=null;b&&(c=f.completed);f.commit();return c};b.prototype.sync=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d;return __generator(this,function(e){a=this.createCommandBuffer();c=a.createComputeCommandEncoder();c.setComputePipelineState(this.getPipelineStateByName("basic.sync"));
	c.dispatch({width:1,height:1,depth:1},{width:1,height:1,depth:1});c.endEncoding();d=a.completed;a.commit();return[2,d]})})};return b}();g.WebGPUHandler=k;k.isBrowserSupported="WebGPURenderingContext"in window&&"WebGPUComputeCommandEncoder"in window})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(){}b.prototype.decode=function(a,c){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(c){return[2,new Float32Array(a.buffer,a.byteOffset,a.byteLength/4)]})})};return b}();g.WeightDecoderRaw=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(){}b.prototype.decode=function(a,c){return __awaiter(this,void 0,void 0,function(){var d,e,f,g,h,l,k,p,t,u,r,v,q;return __generator(this,function(m){d=new Float32Array(c.total_size);e=new DataView(a.buffer,a.byteOffset);for(f=0;f<a.length;){g=e.getInt32(f,!0);f+=4;h=e.getInt32(f,!0);f+=4;l=e.getFloat32(f,!0);f+=8;k=new Float32Array(256);for(p=0;256>p;p++)k[p]=b.decode_table[p&127]*l*(128>p?1:-1);t=new Uint8Array(a.buffer,a.byteOffset+f,h);u=new Zlib.Inflate(t);
	r=u.decompress();v=r.length;for(q=0;q<v;q++)d[g++]=k[r[q]];f+=h}return[2,d]})})};return b}();k.decode_table=[0,2.750000021E-6,7.249999726E-6,1.875000089E-5,3.624999954E-5,5.874999624E-5,8.624999464E-5,1.437500032E-4,2.312500001E-4,3.187500115E-4,4.062500084E-4,5.187499919E-4,6.562499912E-4,7.937499322E-4,9.312499315E-4,.001218750025,.00165624998,.002093750052,.002531250007,.002968749963,.003406249918,.003843750106,.004281249829,.004843750037,.005531250034,.006218749564,.00690624956,.007593749557,
	.008281249553,.008968749084,.009656248614,.01109374966,.01328125037,.01546875015,.01765624993,.0198437497,.02203124948,.02421874925,.02640625089,.02859375067,.03078125045,.03296874836,.03515625,.03734375164,.03953124955,.04171875119,.04390624911,.04671875015,.0501562506,.05359374732,.05703124776,.06046874821,.06390624493,.06734374911,.07078124583,.07421874255,.07765624672,.08109374344,.08453124017,.08796874434,.09140624106,.09484373778,.09828124195,.10546875,.116406247,.127343744,.138281256,.149218753,
	.16015625,.171093747,.182031244,.192968756,.203906253,.21484375,.225781247,.236718744,.247656256,.2585937381,.26953125,.2804687619,.291406244,.302343756,.3132812381,.32421875,.3351562619,.346093744,.357031256,.3679687381,.37890625,.3898437619,.400781244,.411718756,.4226562381,.43359375,.4445312619,.458593756,.4757812321,.4929687381,.5101562142,.52734375,.5445312262,.5617187023,.5789062381,.5960937142,.61328125,.6304687262,.6476562023,.6648437381,.6820312142,.6992186904,.7164062262,.7335937023,.7507811785,
	.7679687142,.7851561904,.8023436666,.8195312023,.8367186785,.8539061546,.8710936904,.8882811666,.9054686427,.9226561785,.9398436546,.9570311308,.9742186666,.9914061427,1];g.WeightDecoderEightbit=k})(WebDNN||(WebDNN={}));(function(g){g.get_weight_decoder=function(k){switch(k){case "raw":return new g.WeightDecoderRaw;case "eightbit":return new g.WeightDecoderEightbit;default:throw Error("Unknown weight encoding");}}})(WebDNN||(WebDNN={}));
(function(g){(function(g){var b=function(){function a(){this.scheduledCallbackId=-1}a.prototype.request=function(a){var c=this;this.fn=a;-1==this.scheduledCallbackId&&(this.scheduledCallbackId=requestAnimationFrame(function(){return c.forceDispatch()}))};a.prototype.forceDispatch=function(){-1!=this.scheduledCallbackId&&(this.cancel(),this.fn())};a.prototype.cancel=function(){-1!=this.scheduledCallbackId&&(cancelAnimationFrame(this.scheduledCallbackId),this.scheduledCallbackId=-1)};return a}();g.DispatchScheduler=
	b})(g.util||(g.util={}))})(WebDNN||(WebDNN={}));var transformDelegate=function(g){return g},fetchDelegate=window.fetch;
(function(g){g.transformUrl=function(g){return transformDelegate(g)};g.registerTransformDelegate=function(g){transformDelegate=g};g.registerFetchDelegate=function(g){fetchDelegate=g};g.fetch=function(g,b){return fetchDelegate(g,b)};g.readArrayBufferProgressively=function(k,b){function a(c){e.set(c.value,f);f+=c.value.length;b&&h.request(function(){return b(f,d)});return f==d?(h.forceDispatch(),e.buffer):m.read().then(a)}if(!b||!k.body)return k.arrayBuffer();var c=k.headers.get("Content-Length");if(!c)return k.arrayBuffer();
	var d=parseInt(c),e=new Uint8Array(d),f=0,m=k.body.getReader(),h=new g.util.DispatchScheduler;return m.read().then(a)}})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(a){this.webGPUHandler=a;this.ignoreCache=!1;this.backend="webgpu"}b.prototype.load=function(a,c){return __awaiter(this,void 0,void 0,function(){var d,e,b,m,h,l;return __generator(this,function(f){switch(f.label){case 0:return d=a+"/graph_"+this.backend+".json",this.ignoreCache&&(d+="?t="+Date.now()),d=g.transformUrl(d),[4,g.fetch(d)];case 1:e=f.sent();if(!e.ok)throw Error(d+" cannot be loaded");b=this;return[4,e.json()];case 2:return b.descriptor=f.sent(),
	[4,this.compile()];case 3:return f.sent(),m=a+"/weight_"+this.backend+".bin",this.ignoreCache&&(m+="?t="+Date.now()),m=g.transformUrl(m),l=g.readArrayBufferProgressively,[4,g.fetch(m,c)];case 4:return[4,l.apply(void 0,[f.sent(),c])];case 5:return h=f.sent(),[4,this.loadWeights(new Uint8Array(h))];case 6:return f.sent(),[2]}})})};b.prototype.setDescriptor=function(a){this.descriptor=a};b.prototype.compile=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d;return __generator(this,function(e){switch(e.label){case 0:this.webGPUHandler.loadKernel(this.descriptor.kernel_source,
	"descriptor"),this.weightMat=new g.BufferWebGPU(this.descriptor.weight_allocation.total_size*Float32Array.BYTES_PER_ELEMENT),this.dataMat=new g.BufferWebGPU(this.descriptor.variable_allocation.total_size*Float32Array.BYTES_PER_ELEMENT),this.metaBufferGPUBuffers=[],a=0,e.label=1;case 1:if(!(a<this.descriptor.exec_infos.length))return[3,4];c=this.descriptor.exec_infos[a];d=new g.BufferWebGPU(c.meta_buffer.length*Float32Array.BYTES_PER_ELEMENT);return[4,d.write(new Uint8Array(c.meta_buffer))];case 2:e.sent(),
	this.metaBufferGPUBuffers.push(d),e.label=3;case 3:return a++,[3,1];case 4:return[2]}})})};b.prototype.loadWeights=function(a){return __awaiter(this,void 0,void 0,function(){var c,d,e;return __generator(this,function(f){switch(f.label){case 0:return c=g.get_weight_decoder(this.descriptor.weight_encoding),e=(d=this.weightMat).write,[4,c.decode(a,this.descriptor.weight_allocation)];case 1:return[4,e.apply(d,[f.sent()])];case 2:return f.sent(),[2]}})})};b.prototype.getInputViews=function(){return __awaiter(this,
	void 0,void 0,function(){var a,c,d;return __generator(this,function(e){if(this.inputViews)return[2,this.inputViews];a=[];for(c=0;c<this.descriptor.inputs.length;c++)d=this.descriptor.variable_allocation.allocation[this.descriptor.inputs[c]],a.push(this.dataMat.getWriteView(d.offset,d.size,Float32Array));this.inputViews=a;return[2,a]})})};b.prototype.getOutputViews=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d;return __generator(this,function(e){if(this.outputViews)return[2,this.outputViews];
	a=[];for(c=0;c<this.descriptor.outputs.length;c++)d=this.descriptor.variable_allocation.allocation[this.descriptor.outputs[c]],a.push(this.dataMat.getReadView(d.offset,d.size,Float32Array));this.outputViews=a;return[2,a]})})};b.prototype.run=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d,e,f,b,g,l,k;return __generator(this,function(h){switch(h.label){case 0:if(!this.inputViews||!this.outputViews)throw Error("getInputViews and getOutputViews must be called prior to run");if(!window.PROFILE)return[3,
	5];a=[];d=c=0;h.label=1;case 1:if(!(d<this.descriptor.exec_infos.length))return[3,4];e=this.descriptor.exec_infos[d];f=performance.now();return[4,this.webGPUHandler.executeSinglePipelineState("descriptor."+e.entry_func_name,e.threadgroups_per_grid,e.threads_per_thread_group,[this.weightMat,this.dataMat,this.metaBufferGPUBuffers[d]],!0)];case 2:h.sent(),b=performance.now()-f,a.push({Kernel:e.entry_func_name,"Elapsed time [ms]":b}),c+=b,h.label=3;case 3:return d++,[3,1];case 4:return g=Array.from(Object.values(a.reduce(function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        c){c.Kernel in a||(a[c.Kernel]={Kernel:c.Kernel,Count:0,"Elapsed time [ms]":0});a[c.Kernel].Count++;a[c.Kernel]["Elapsed time [ms]"]+=c["Elapsed time [ms]"];return a},{}))),g.forEach(function(a){return a["Ratio [%]"]=(a["Elapsed time [ms]"]/c).toFixed(2)}),console.table(a),console.table(g),[3,7];case 5:l=null;for(d=0;d<this.descriptor.exec_infos.length;d++)e=this.descriptor.exec_infos[d],k=d==this.descriptor.exec_infos.length-1,l=this.webGPUHandler.executeSinglePipelineState("descriptor."+e.entry_func_name,
	e.threadgroups_per_grid,e.threads_per_thread_group,[this.weightMat,this.dataMat,this.metaBufferGPUBuffers[d]],k);return[4,l];case 6:h.sent(),h.label=7;case 7:return[2]}})})};return b}();g.DescriptorRunnerWebGPU=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(a){this.option=a;if(!g.WebGPUHandler.isBrowserSupported)throw Error("WebGPU is not supported on this browser");}b.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){switch(a.label){case 0:return this.shaderLanguage="metal",this.webgpuHandler=new g.WebGPUHandler,[4,this.webgpuHandler.init()];case 1:return a.sent(),g.BufferWebGPU.init(this.webgpuHandler),this.init_basic_kernels(),[2]}})})};b.prototype.init_basic_kernels=
	function(){this.webgpuHandler.loadKernel("kernel void sync(){}","basic")};b.prototype.createDescriptorRunner=function(){return new g.DescriptorRunnerWebGPU(this.webgpuHandler)};return b}();g.GPUInterfaceWebGPU=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(){this.ignoreCache=!1;this.backend="webassembly";this.worker_initial_error=this.worker_promise_reject_func=null}b.prototype.load=function(a,c){return __awaiter(this,void 0,void 0,function(){var d,e,b,m,h,l,k,p;return __generator(this,function(f){switch(f.label){case 0:return d=a+"/graph_"+this.backend+".json",this.ignoreCache&&(d+="?t="+Date.now()),d=g.transformUrl(d),[4,g.fetch(d)];case 1:e=f.sent();if(!e.ok)throw Error(d+" cannot be loaded");b=this;return[4,
	e.json()];case 2:return b.descriptor=f.sent(),m="object"===typeof WebAssembly?"webassembly":"asmjs",h=a+"/kernels_"+m+".js",this.ignoreCache&&(h+="?t="+Date.now()),this.worker_entry_js_path=h=g.transformUrl(h),[4,this.compile()];case 3:return f.sent(),l=a+"/weight_"+this.backend+".bin",this.ignoreCache&&(l+="?t="+Date.now()),l=g.transformUrl(l),p=g.readArrayBufferProgressively,[4,g.fetch(l)];case 4:return[4,p.apply(void 0,[f.sent(),c])];case 5:return k=f.sent(),[4,this.loadWeights(new Uint8Array(k))];
	case 6:return f.sent(),[2]}})})};b.prototype.setDescriptor=function(a){this.descriptor=a};b.prototype.compile=function(){var a=this;this.worker=new Worker(this.worker_entry_js_path);this.worker.onerror=function(c){console.error("Worker Exception: "+c.message);a.worker_promise_reject_func?a.worker_promise_reject_func(c):a.worker_initial_error=c};return new Promise(function(c,d){a.worker_initial_error?d(a.worker_initial_error):(a.worker_promise_reject_func=d,a.worker.onmessage=function(e){0===e.data?
	c():(a.worker.terminate(),d(Error(e.data)))})})};b.prototype.loadWeights=function(a){return __awaiter(this,void 0,void 0,function(){var c=this,d,e,b;return __generator(this,function(f){switch(f.label){case 0:return d=g.get_weight_decoder(this.descriptor.weight_encoding),[4,d.decode(a,this.descriptor.weight_allocation)];case 1:return e=f.sent(),b=new Promise(function(a,d){c.worker_promise_reject_func=d;c.worker.onmessage=function(b){0===b.data?a():(c.worker.terminate(),d(Error(b.data)))};c.worker.postMessage({type:"weight",
	data:e})}),[2,b]}})})};b.prototype.getInputViews=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d;return __generator(this,function(b){if(this.inputViews)return[2,this.inputViews];a=[];for(c=0;c<this.descriptor.inputs.length;c++)d=this.descriptor.variable_allocation.allocation[this.descriptor.inputs[c]],a.push(new Float32Array(d.size));this.inputViews=a;return[2,a]})})};b.prototype.getOutputViews=function(){return __awaiter(this,void 0,void 0,function(){var a,c,d;return __generator(this,
	function(b){if(this.outputViews)return[2,this.outputViews];a=[];for(c=0;c<this.descriptor.outputs.length;c++)d=this.descriptor.variable_allocation.allocation[this.descriptor.outputs[c]],a.push(new Float32Array(d.size));this.outputViews=a;return[2,a]})})};b.prototype.run=function(){return __awaiter(this,void 0,void 0,function(){var a=this,c;return __generator(this,function(d){if(!this.inputViews||!this.outputViews)throw Error("getInputViews and getOutputViews must be called prior to run");c=new Promise(function(c,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        d){a.worker_promise_reject_func=d;a.worker.onmessage=function(b){if(Array.isArray(b.data)){for(var e=0;e<b.data.length;e++)a.outputViews[e].set(b.data[e]);c()}else a.worker.terminate(),d(Error(b.data))};for(var b=[],e=0;e<a.descriptor.inputs.length;e++){var f=a.descriptor.variable_allocation.allocation[a.descriptor.inputs[e]];b.push({offset:f.offset,size:f.size,data:a.inputViews[e]})}for(var g=[],e=0;e<a.descriptor.outputs.length;e++)f=a.descriptor.variable_allocation.allocation[a.descriptor.outputs[e]],
	g.push({offset:f.offset,size:f.size});a.worker.postMessage({type:"run",inputs:b,outputs:g})});return[2,c]})})};return b}();g.DescriptorRunnerWebassembly=k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(a){this.option=a;if("undefined"===typeof Worker)throw Error("WebWorker is needed for WebAssembly backend");"object"!==typeof WebAssembly&&console.warn("WebAssembly is not supported on this browser, trying to use asm.js code")}b.prototype.init=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2]})})};b.prototype.createDescriptorRunner=function(){return new g.DescriptorRunnerWebassembly};return b}();g.GPUInterfaceWebassembly=
	k})(WebDNN||(WebDNN={}));
(function(g){var k=function(){function b(){this.ignoreCache=!1;this.backend="fallback"}b.prototype.load=function(a,c){return __awaiter(this,void 0,void 0,function(){var b,e,f,k,h,l;return __generator(this,function(d){switch(d.label){case 0:return b=a+"/graph_"+this.backend+".json",this.ignoreCache&&(b+="?t="+Date.now()),b=g.transformUrl(b),[4,g.fetch(b)];case 1:e=d.sent();if(!e.ok)throw Error(b+" cannot be loaded");f=this;return[4,e.json()];case 2:return f.descriptor=d.sent(),[4,this.compile()];case 3:return d.sent(),
	k=a+"/weight_"+this.backend+".bin",this.ignoreCache&&(k+="?t="+Date.now()),k=g.transformUrl(k),l=g.readArrayBufferProgressively,[4,g.fetch(k)];case 4:return[4,l.apply(void 0,[d.sent(),c])];case 5:return h=d.sent(),[4,this.loadWeights(new Uint8Array(h))];case 6:return d.sent(),[2]}})})};b.prototype.setDescriptor=function(a){this.descriptor=a};b.prototype.compile=function(){return __awaiter(this,void 0,void 0,function(){var a,c,b,e,f;return __generator(this,function(d){this.compileKernel();this.rawWeightArray=
	new Float32Array(this.descriptor.weight_allocation.total_size);a=this.descriptor.weight_allocation.allocation;this.weightArrays=new Map;for(c in a)b=a[c],this.weightArrays.set(c,new Float32Array(this.rawWeightArray.buffer,b.offset*Float32Array.BYTES_PER_ELEMENT,b.size));this.variableArrays=new Map;e=this.descriptor.variable_allocation.allocation;for(f in e)b=e[f],this.variableArrays.set(f,new Float32Array(b.size));return[2]})})};b.prototype.compileKernel=function(){eval(this.descriptor.kernel_source);
	this.kernelObj=void 0};b.prototype.loadWeights=function(a){return __awaiter(this,void 0,void 0,function(){var c,b,e;return __generator(this,function(d){switch(d.label){case 0:return c=g.get_weight_decoder(this.descriptor.weight_encoding),e=(b=this.rawWeightArray).set,[4,c.decode(a,this.descriptor.weight_allocation)];case 1:return e.apply(b,[d.sent()]),[2]}})})};b.prototype.run=function(){return __awaiter(this,void 0,void 0,function(){var a=this,c,b,e,f,g,h,k,n,p;return __generator(this,function(d){switch(d.label){case 0:if(!this.inputViews||
	!this.outputViews)throw Error("getInputViews and getOutputViews must be called prior to run");c=Date.now();b=Date.now();e=0;d.label=1;case 1:if(!(e<this.descriptor.exec_infos.length))return[3,5];f=Date.now();if(!(1E3<=f-b))return[3,3];g=f-c;console.log("Processed "+e+"/"+this.descriptor.exec_infos.length+" kernels in "+g+" ms");b=f;return[4,this.wait_to_display()];case 2:d.sent(),d.label=3;case 3:h=this.descriptor.exec_infos[e],k=h.inputs.map(function(b){return a.variableArrays.get(b)}),n=h.outputs.map(function(b){return a.variableArrays.get(b)}),
	p=h.weights.map(function(b){return a.weightArrays.get(b)}),this.kernelObj[h.entry_func_name](k,n,p,h.call_option),d.label=4;case 4:return e++,[3,1];case 5:return console.log("Processed "+this.descriptor.exec_infos.length+"/"+this.descriptor.exec_infos.length+" kernels in "+(Date.now()-c)+" ms"),[2]}})})};b.prototype.wait_to_display=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2,new Promise(function(a,b){setTimeout(a,10)})]})})};b.prototype.getInputViews=
	function(){return __awaiter(this,void 0,void 0,function(){var a=this,b;return __generator(this,function(c){if(this.inputViews)return[2,this.inputViews];this.inputViews=b=this.descriptor.inputs.map(function(b){return a.variableArrays.get(b)});return[2,b]})})};b.prototype.getOutputViews=function(){return __awaiter(this,void 0,void 0,function(){var a=this,b;return __generator(this,function(c){if(this.outputViews)return[2,this.outputViews];this.outputViews=b=this.descriptor.outputs.map(function(b){return a.variableArrays.get(b)});
	return[2,b]})})};return b}();g.DescriptorRunnerFallback=k})(WebDNN||(WebDNN={}));(function(g){var k=function(){function b(a){this.option=a}b.prototype.init=function(a){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(a){return[2]})})};b.prototype.createDescriptorRunner=function(){return new g.DescriptorRunnerFallback};return b}();g.GPUInterfaceFallback=k})(WebDNN||(WebDNN={}));
(function(g){function k(){return __awaiter(this,void 0,void 0,function(){var b,f,m,h;return __generator(this,function(e){switch(e.label){case 0:b=c.shift();if(!b)throw Error("No backend is available");f=a[b];e.label=1;case 1:e.trys.push([1,3,,5]);switch(b){case "webgpu":m=new g.GPUInterfaceWebGPU(f);break;case "webassembly":m=new g.GPUInterfaceWebassembly(f);break;case "fallback":m=new g.GPUInterfaceFallback(f);break;default:throw Error("Unknown backend "+b);}return[4,m.init()];case 2:return e.sent(),
	g.gpu=m,d=b,[3,5];case 3:return h=e.sent(),console.warn("Failed to initialize "+b+" backend: "+h),[4,k()];case 4:return[2,e.sent()];case 5:return[2,d]}})})}function b(b,f){void 0===f&&(f={});return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return b?"string"===typeof b&&(b=[b]):b=["webgpu","webassembly"],a=f,c=b.concat(["fallback"]),[4,k()];case 1:return e.sent(),[2,d]}})})}var a,c,d;g.init=b;g.prepareAll=function(a,c){void 0===c&&(c={});return __awaiter(this,
	void 0,void 0,function(){var e,f,l,n;return __generator(this,function(h){switch(h.label){case 0:return[4,b(c.backendOrder,c.backendOptions)];case 1:h.sent(),h.label=2;case 2:h.label=3;case 3:return h.trys.push([3,7,,9]),e=g.gpu.createDescriptorRunner(),[4,e.load(a,c.progressCallback)];case 4:return h.sent(),[4,e.getInputViews()];case 5:return f=h.sent(),[4,e.getOutputViews()];case 6:return l=h.sent(),[2,{backendName:d,inputViews:f,outputViews:l,run:e.run.bind(e)}];case 7:return n=h.sent(),console.error("Model loading failed for "+
		d+" backend. Trying next backend. "+n.message),[4,k()];case 8:return h.sent(),[3,9];case 9:return[3,2];case 10:return[2]}})})}})(WebDNN||(WebDNN={}));
(function(g){(function(g){g.argmax=function(b,a){void 0===a&&(a=1);for(var c=[[0,b.length]],d={};0<c.length;){var e=c.shift(),f=e[0],e=e[1],g=b[e-1],h=f,k=e-2;if(!(f>=e)){for(;;){for(;b[h]>g&&h<=k;)h++;for(;b[k]<=g&&h<=k;)k--;if(h>=k)break;var n=b[h]||h;b[h]=b[k]||k;b[k]=n;n=d[h]||h;d[h]=d[k]||k;d[k]=n}h!=e-1&&(b[e-1]=b[h],b[h]=g,n=d[e-1]||e-1,d[e-1]=d[h]||h,d[h]=n);c.unshift([f,h]);h+1<a&&c.unshift([h+1,e])}}c=[];for(f=0;f<a;f++)c.push(f in d?d[f]:f);return c};g.argmin=function(b,a){void 0===a&&
(a=1);for(var c=[[0,b.length]],d={};0<c.length;){var e=c.shift(),f=e[0],e=e[1],g=b[e-1],h=f,k=e-2;if(!(f>=e)){for(;;){for(;b[h]<g&&h<=k;)h++;for(;b[k]>=g&&h<=k;)k--;if(h>=k)break;var n=b[h]||h;b[h]=b[k]||k;b[k]=n;n=d[h]||h;d[h]=d[k]||k;d[k]=n}h!=e-1&&(b[e-1]=b[h],b[h]=g,n=d[e-1]||e-1,d[e-1]=d[h]||h,d[h]=n);c.unshift([f,h]);h+1<a&&c.unshift([h+1,e])}}c=[];for(f=0;f<a;f++)c.push(f in d?d[f]:f);return c}})(g.Math||(g.Math={}))})(WebDNN||(WebDNN={}));
(function(g){g.getBackendAvailability=function(){var g={webgpu:"WebGPUComputeCommandEncoder"in window,webassembly:"Worker"in window,fallback:!0},b=["webgpu","webassembly","fallback"].filter(function(a){return g[a]});return{status:g,defaultOrder:b}}})(WebDNN||(WebDNN={}));