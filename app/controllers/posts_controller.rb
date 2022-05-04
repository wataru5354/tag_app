class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update]

  def index
    @posts = Post.all
  end

  def new
    @post_form = PostForm.new
  end

  def create
    @post_form = PostForm.new(post_form_params)
    if @post_form.valid?
      @post_form.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    # @postのデータをハッシュ型で取得
    post_attributes = @post.attributes
    @post_form = PostForm.new(post_attributes)
    # 最初のタグがnilの場合はnilを返し、情報があればそのインスタンスを返す
    @post_form.tag_name = @post.tags&.first&.tag_name
  end

  def update
    @post_form = PostForm.new(post_form_params)
    # 画像を選択し直していない場合は、既存の画像をセットする
    @post_form.image ||= @post.image.blob
    if @post_form.valid? 
      # updateメソッドに二つの引数を渡す
      @post_form.update(post_form_params ,@post)
      redirect_to root_path
    else
      render :edit
    end
  end

  def search
    return nil if params[:keyword] == ""
    tag = Tag.where(['tag_name LIKE ?',"%#{params[:keyword]}%"])
    render json:{keyword: tag}
  end

  private
  def post_form_params
    params.require(:post_form).permit(:text, :tag_name ,:image)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
