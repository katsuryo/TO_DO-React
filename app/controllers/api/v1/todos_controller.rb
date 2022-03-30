class Api::V1::TodosController < ApplicationController
  def index
    # いつもはallだが、アップデートした順に並べたいためorderを使用
    todos = Todo.order(updated_at: :desc)

    # 上の "todos"が下の記述により、json形式でrenderされる
    render json: todos
  end

  def show
    todo = Todo.find(params[:id])
    render json: todo
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      # saveされたらjsonで返す
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def update
    todo = Todo.find(params[:id])
    if todo.update(todo_params)
      render json: todo
    else
      render json: todo.errors, status: 422
    end
  end

  def destroy
    if Todo.destroy(params[:id])
      # 特に返すものがないから
      head :no_content
    else
      # error文
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Todo.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

  def todo_params
    params.require(:todo).permit(:name, :is_completed)
  end
end
