package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os" // 导入 os 包来读取环境变量

	"github.com/joho/godotenv" // 导入 godotenv
)

type Message struct {
	Text string `json:"text"`
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000") // 只允许本地前端访问（更安全）
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST")            // 允许的HTTP方法
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")         // 允许的请求头
}

func messageHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	message := Message{Text: "Hello from Go backend!"}
	jsonData, err := json.Marshal(message)
	if err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}
func main() {
	// 在 main 函数开始时加载 .env 文件
	err := godotenv.Load()
	if err != nil {
		log.Println("Warning: .env file not found, using default port 8080")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // 如果环境变量没设置，提供一个默认值
	}

	http.HandleFunc("/api/message", messageHandler)
	fmt.Printf("Go server listening on port %s\n", port)
	http.ListenAndServe(":"+port, nil)

	// 使用变量来启动服务
	log.Fatal(http.ListenAndServe(":"+port, nil)) // log.Fatal 的作用是当 http.ListenAndServe 返回错误时，打印错误信息并终止程序。
}
