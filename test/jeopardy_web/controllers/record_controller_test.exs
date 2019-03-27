defmodule JeopardyWeb.RecordControllerTest do
  use JeopardyWeb.ConnCase

  alias Jeopardy.Records
  alias Jeopardy.Records.Record

  @create_attrs %{
    player: "some player",
    score: 42
  }
  @update_attrs %{
    player: "some updated player",
    score: 43
  }
  @invalid_attrs %{player: nil, score: nil}

  def fixture(:record) do
    {:ok, record} = Records.create_record(@create_attrs)
    record
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all records", %{conn: conn} do
      conn = get(conn, Routes.record_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create record" do
    test "renders record when data is valid", %{conn: conn} do
      conn = post(conn, Routes.record_path(conn, :create), record: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.record_path(conn, :show, id))

      assert %{
               "id" => id,
               "player" => "some player",
               "score" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.record_path(conn, :create), record: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update record" do
    setup [:create_record]

    test "renders record when data is valid", %{conn: conn, record: %Record{id: id} = record} do
      conn = put(conn, Routes.record_path(conn, :update, record), record: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.record_path(conn, :show, id))

      assert %{
               "id" => id,
               "player" => "some updated player",
               "score" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, record: record} do
      conn = put(conn, Routes.record_path(conn, :update, record), record: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete record" do
    setup [:create_record]

    test "deletes chosen record", %{conn: conn, record: record} do
      conn = delete(conn, Routes.record_path(conn, :delete, record))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.record_path(conn, :show, record))
      end
    end
  end

  defp create_record(_) do
    record = fixture(:record)
    {:ok, record: record}
  end
end
