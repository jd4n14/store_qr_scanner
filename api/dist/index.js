"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const autoload_1 = __importDefault(require("@fastify/autoload"));
const path = __importStar(require("node:path"));
const cors_1 = __importDefault(require("@fastify/cors"));
const static_1 = __importDefault(require("@fastify/static"));
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(autoload_1.default, {
    dir: path.join(__dirname, "plugins"),
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.register(cors_1.default, {
            origin: "*",
            allowedHeaders: ["Content-Type", "Authorization"],
        });
        app.register(static_1.default, {
            root: path.join(__dirname, "..", "..", "app", "dist"),
            wildcard: true,
        });
        app.get("/", (req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            return reply.sendFile("index.html");
        }));
        // redirect all other routes to index.html
        app.setNotFoundHandler((req, reply) => __awaiter(void 0, void 0, void 0, function* () {
            return reply.sendFile("index.html");
        }));
        yield app.listen({ port: 3000, host: "0.0.0.0" });
    }
    catch (err) {
        app.log.error(err);
        process.exit(1);
    }
});
start();
