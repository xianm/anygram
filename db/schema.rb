# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141027100418) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: true do |t|
    t.integer  "user_id",                       null: false
    t.integer  "from_id",                       null: false
    t.integer  "submission_id",                 null: false
    t.string   "text",                          null: false
    t.boolean  "read",          default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "alerts", ["user_id"], name: "index_alerts_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id",       null: false
    t.integer  "submission_id", null: false
    t.text     "content",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["submission_id"], name: "index_comments_on_submission_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "favorites", force: true do |t|
    t.integer  "user_id",       null: false
    t.integer  "submission_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "favorites", ["submission_id"], name: "index_favorites_on_submission_id", using: :btree
  add_index "favorites", ["user_id", "submission_id"], name: "index_favorites_on_user_id_and_submission_id", unique: true, using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "follows", force: true do |t|
    t.integer  "user_id",     null: false
    t.integer  "follower_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree
  add_index "follows", ["user_id", "follower_id"], name: "index_follows_on_user_id_and_follower_id", unique: true, using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "profiles", force: true do |t|
    t.integer  "user_id",                                                                                               null: false
    t.string   "name",                                                                                                  null: false
    t.string   "display_name",                                                                                          null: false
    t.text     "bio"
    t.string   "location"
    t.integer  "sex",          default: 0,                                                                              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_url",   default: "https://s3-us-west-1.amazonaws.com/any-gram-prod/images/resources/avatar.png"
  end

  add_index "profiles", ["name"], name: "index_profiles_on_name", unique: true, using: :btree
  add_index "profiles", ["user_id"], name: "index_profiles_on_user_id", using: :btree

  create_table "submissions", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "source_file_name"
    t.string   "source_content_type"
    t.integer  "source_file_size"
    t.datetime "source_updated_at"
    t.text     "caption"
  end

  add_index "submissions", ["user_id"], name: "index_submissions_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                           null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token",                   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "is_guest",        default: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
