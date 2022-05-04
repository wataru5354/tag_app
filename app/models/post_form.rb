class PostForm
  include ActiveModel::Model
  # Formオブジェクトを使用する際はここで全てのバリデーションを設定すること
  attr_accessor(
    :text,:image,
    # 編集の際はidが必要になるので、ここで編集したいidを取得できるようにする
    :id, :created_at, :datetime, :updated_at, :datetime,
    :tag_name
  ) 

  with_options presence: true do
    validates :text
    validates :image
  end

  # controllerから受け取ったデータをsaveメソッドで処理する
  def save
    post = Post.create(text: text,image: image)
    #first_or_initializeメソッドを使用することにより、該当するレコードがあればそのインスタンスを返し、なければ新しくインスタンスを生成することができる
    tag = Tag.where(tag_name: tag_name).first_or_initialize 
    tag.save
    PostTagRelation.create(post_id: post.id, tag_id: tag.id)
  end

  def update(params, post)
    #タグの紐付けをなくす（タグの上書きを行うため）
    post.post_tag_relations.destroy_all
    # post_form_paramsからタグ情報を消し、タグ情報を変数に代入
    tag_name = params.delete(:tag_name)
    # タグモデルからタグの情報を取得する。情報がなければ新しくインスタンスを生成
    tag = Tag.where(tag_name: tag_name).first_or_initialize if tag_name.present?
    tag.save if tag_name.present?
    # @postにpost_form_paramのデータを更新する
    post.update(params)
    PostTagRelation.create(post_id: post.id,tag_id: tag.id) if tag_name.present?
  end

end