package db_test

import (
	"database/sql"
	"github.com/cezarzaleski/fullcycle/hexagonal/adapters/db"
	"github.com/stretchr/testify/require"
	"log"
	"testing"
)

var Db *sql.DB

func setUp() {
	Db, _ = sql.Open("sqli3", ":memory")
	createTable(Db)
	createProduct(Db)
}

func createTable(db *sql.DB) {
	table := `CREATE TABLE products (
			  "id" string,
			  "name" string
			  "price" float,
			  "status" string
);`
	stmt, err := db.Prepare(table)
	if err != nil {
		log.Fatal(err.Error())
	}
	stmt.Exec()
}

func createProduct(db *sql.DB)  {
	insert := `insert into products values("abcd", "Product Test", 0, "disabled");`
	stmt, err := db.Prepare(insert)
	if err != nil {
		log.Fatal(err.Error())
	}
	stmt.Exec()
}

func TestProductDb_Get(t *testing.T) {
	setUp()
	defer Db.Close()
	productDb := db.NewProductDb(Db)
	product, _ := productDb.Get("abc")
	require.Nil(t, "Product Teste", product.GetName())
	require.Nil(t, 0.0, product.GetPrice())
	require.Nil(t, "disabled", product.GetStatus())
}
