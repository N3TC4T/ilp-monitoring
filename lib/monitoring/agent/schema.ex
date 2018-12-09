defmodule Monitoring.Agent.Schema do

  @derive {Poison.Encoder, except: [:__meta__]}


  @schema %{
            "type" => "object",
            "properties" => %{
              "blah" => %{"type" => "number"},
              "load" => %{"type" => "number"},
              "uptime" => %{"type" => "string"},
              "ip" => %{"type" => "string"},
              "hostname" => %{"type" => "string"},
              "capture_time" => %{"type" => "number"},
              "accounts" => %{"type" => "object", "minProperties" => 1},
              "routing" => %{"type" => "object"},
            },
            "required" => ["accounts", "routing"]
          } |> ExJsonSchema.Schema.resolve

  def schema do
    @schema
  end


  def validate parsed do
    try do
      ExJsonSchema.Validator.validate(@schema, parsed)
    rescue
      RuntimeError -> {:error, "Unexpected Error!"}
    end
  end
  @doc """
  Parse and validate raw agent data

  Raises `Error` if data is not valid.

  """
  def parse params do
    params
    |> Poison.Parser.parse
    |> case do
      {:ok , parsed } ->
        parsed
        |> validate
        |> case do
            :ok -> {:ok, parsed}
            {:error, reason} ->  {:error, reason}
        end
      {:error, reason } -> {:error, reason }
    end

  end
end
